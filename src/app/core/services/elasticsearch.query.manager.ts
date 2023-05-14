import {Injectable} from "@angular/core";
import {ElasticsearchRequestBuilder} from "./elasticsearch.request.builder";
import {ElasticRequest} from "../models/elastic.request";
import {CatalogOption} from "../../catalogue/models/catalog.option";
import {CommonService} from "./common.service";
import {QueryParametersService} from "./query.parameters.service";
import {ApiConstants} from "../configurations/api.constants";

const SIZE_PER_PAGE = 30;
const AGGREGATION_SIZE = 100;

@Injectable({
  providedIn: 'root'
})
export class ElasticsearchQueryManager {

  private _elasticsearchRequestBuilder: ElasticsearchRequestBuilder = new ElasticsearchRequestBuilder();

  constructor(
    private queryParametersService: QueryParametersService,
    private commonService: CommonService,
    private constants: ApiConstants
  ) {}

  public createRequest(catalogOptions: CatalogOption[], queryParamMap: Record<any,any>): ElasticRequest {
    this._elasticsearchRequestBuilder = new ElasticsearchRequestBuilder();
    console.log(queryParamMap);
    this.prepareStandardBlockRequest(queryParamMap);
    this.prepareSortBlockRequest(queryParamMap);
    this.prepareQueryBlockRequest(queryParamMap);
    const filterTerms: any = { must: this.prepareFilterTerms(catalogOptions, queryParamMap) };
    this.prepareAggregationBlockRequest(catalogOptions, filterTerms);
    if(filterTerms?.must?.length > 0)
      this.preparePostFilterBlockRequest(filterTerms);
    return this._elasticsearchRequestBuilder.build();
  }

  private prepareStandardBlockRequest(queryParamMap: Record<any,any>): void {
    let from: number = 0;
    if(queryParamMap['page'])
      from = this.queryParametersService.sizeFromNumberPage(queryParamMap['page']);
    this._elasticsearchRequestBuilder.addProperty('from', from);
    this._elasticsearchRequestBuilder.addProperty( 'size', SIZE_PER_PAGE);
  }

  private prepareSortBlockRequest(queryParamMap: Record<any,any>) {
    let sort: Record<any,any> = {};
    if(queryParamMap['sort'])
      switch (queryParamMap['sort']) {
        case 'asc':
          sort['price'] = queryParamMap['sort'];
          break;
        case 'desc':
          sort['price'] = queryParamMap['sort'];
          break;
      }
    if(!this.commonService.isEmptyObject(sort))
      this._elasticsearchRequestBuilder.addProperty('sort', sort);
  }

  private prepareQueryBlockRequest(queryParamMap: Record<any,any>) {
    const query: Record<any, any> = this.startBlockQuery(queryParamMap);
    this._elasticsearchRequestBuilder.addQuery(query);
  }

  private startBlockQuery(queryParamMap: any): Record<any, any> {
    return {
      bool: {
        must: [
          {
            term: {
              catalog_id: queryParamMap['catalog_id']
            }
          }
        ]
      }
    };
  }

  private prepareFilterTerms(catalogOptions: CatalogOption[], queryParamMap: Record<any, any>): any[] {
    const queryParamMapKeys: string[] = this.filterStandardQueryProperties(queryParamMap);
    return queryParamMapKeys.map((key) => {
      const catalogOption: CatalogOption | undefined = catalogOptions.find((item) => item.en_name == key);
      const keyName: string = this.preparePropertyNameOfTermInBlockQuery(catalogOption, key);
      if(catalogOption?.schema_name?.includes('range'))
        return this.prepareRange(queryParamMap, key, keyName);
      return this.prepareTerms(queryParamMap, key, keyName);
    });
  }

  private prepareRange(queryParamMap: Record<any, any>, key: string, keyName: string) {
    const keyValue: string[] = this.preparePropertyValueOfRangeInBlockQuery(queryParamMap, key);
    const min: string = keyValue[0];
    const max: string = keyValue[1];
    let range: any = {};
    if(min) {
      range['min'] = min;
    }
    if(max){
      range['max'] = max;
    }
    return {
      range:
        {
          [keyName]: {gte: range['min'], lte: range['max']}
        }
    }
  }

  private prepareTerms(queryParamMap: Record<any, any>, key: string, keyName: string): any {
    const keyValue: any[] = this.preparePropertyValueOfTermInBlockQuery(queryParamMap, key);
    return {
      terms:
        {
          [keyName]: keyValue
        }
    }
  }

  private preparePropertyNameOfTermInBlockQuery(catalogOption: CatalogOption | undefined, key: string): string {
    switch (catalogOption?.type) {
      case 'array':
        return 'good_data.' + key + '.name.keyword';
      default:
        return 'good_data.' + key;
    }
  }

  private filterStandardQueryProperties(queryParamMap: Record<any, any>): string[] {
    return Object.keys(queryParamMap)
      .filter((key) => !this.constants.standardQueryProperties.includes(key));
  }

  private startAggregationBlockQuery(fieldName: string): Record<any, any> {
    return {
      terms: {
        size: AGGREGATION_SIZE,
        field: fieldName
      }
    };
  }

  private startAggregationRangeBlockQuery(fieldName: string): Record<any, any>[] {
    return [
      {min: {field: fieldName}},
      {max: {field: fieldName}}
    ];
  }

  private preparePropertyValueOfTermInBlockQuery(queryParamMap: Record<any,any>, key:string): string[] {
    let keyValue: string[] = queryParamMap[key].split('_');
    if(keyValue.includes('Да'))
      keyValue[keyValue.indexOf('Да')] = 'true';
    if(keyValue.includes('Нет'))
      keyValue[keyValue.indexOf('Нет')] = 'false';
    return keyValue;
  }

  private preparePropertyValueOfRangeInBlockQuery(queryParamMap: Record<any,any>, key:string): string[] {
    return queryParamMap[key].split('~');
  }

  private prepareAggregationBlockRequest(catalogOptions: CatalogOption[], filterTerms: any): void {
    let aggregations: any = {};
    catalogOptions.forEach((catalogOption) => {
      const fieldName: string = this.getFieldName(catalogOption);
      const aggregationName: string = catalogOption.en_name ? catalogOption.en_name : '';
      const excludeFilterTerms: any = this.excludeFilterTerms(filterTerms, aggregationName);
      if(catalogOption.schema_name?.includes('range')) {
        this.aggregationRangeBlockQuery(fieldName, aggregationName, excludeFilterTerms, aggregations);
      }
      else {
        this.aggregationTermBlockQuery(fieldName, aggregationName, excludeFilterTerms, aggregations);
      }
    });
    this._elasticsearchRequestBuilder.addAggregation(aggregations);
  }

  private aggregationRangeBlockQuery(fieldName: string, aggregationName: string, excludeFilterTerms: any, aggregations: any): void {
    const aggs: any[] = this.startAggregationRangeBlockQuery(fieldName);
    aggs.forEach((item: Record<any, any>) => {
      if(excludeFilterTerms) {
        const aggsRange: any = { aggs: item };
        const filter: any = { bool: excludeFilterTerms };
        aggregations[aggregationName+'_'+Object.keys(item)[0]] = {filter, aggs: aggsRange};
      }
      else {
        aggregations[aggregationName+'_'+Object.keys(item)[0]] = item;
      }
    });
  }

  private aggregationTermBlockQuery(fieldName: string, aggregationName: string, excludeFilterTerms: any, aggregations: any): void {
    const aggs: any = this.startAggregationBlockQuery(fieldName);
    if(excludeFilterTerms) {
      const aggsTerm: any = {aggs};
      const filter: any = {bool: excludeFilterTerms};
      aggregations[aggregationName] = {filter, aggs: aggsTerm};
    }
    else {
      aggregations[aggregationName] = aggs;
    }
  }

  private excludeFilterTerms(filterTerms: any, aggregationName: string): any {
    if(filterTerms?.must?.length > 0)
      return { must:
          filterTerms.must.filter((item: any) =>
            !Object.keys(item['terms'] ? item['terms'] : item['range'])[0].includes(aggregationName))
      };
    return undefined;
  }

  private getFieldName(catalogOption: CatalogOption): string {
    if (catalogOption.type == 'array')
      return 'good_data.' + catalogOption.en_name + '.name.keyword';
    else
      return 'good_data.' + catalogOption.en_name;
  }

  private preparePostFilterBlockRequest(filterTerms: any) {
    const postFilter: any = { bool: { must: filterTerms.must } };
    this._elasticsearchRequestBuilder.addPostFilter(postFilter);
  }

}
