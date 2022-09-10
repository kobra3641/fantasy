import {Injectable} from "@angular/core";
import {ElasticsearchRequestBuilder} from "./elasticsearch.request.builder";
import {ElasticRequest} from "../models/elastic.request";
import {CatalogOption} from "../../catalogue/models/catalog.option";
import {CommonService} from "./common.service";
import {QueryParametersService} from "./query.parameters.service";
import {ApiConstants} from "../configurations/api.constants";

const SIZE_PER_PAGE = 20;
const AGGREGATION_SIZE = 1_000;

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
    this.prepareStandardQueryProperties(queryParamMap);
    this.prepareUniqueQueryProperties(queryParamMap);
    this.prepareBlockQueryInQueryProperties(catalogOptions, queryParamMap);
    this.prepareAggregationQueryProperties(catalogOptions);
    return this._elasticsearchRequestBuilder.build();
  }

  private prepareStandardQueryProperties(queryParamMap: Record<any,any>): void {
    let from: number = 0;
    if(queryParamMap['page'])
      from = this.queryParametersService.sizeFromNumberPage(queryParamMap['page']);
    this._elasticsearchRequestBuilder.addProperty('from', from);
    this._elasticsearchRequestBuilder.addProperty( 'size', SIZE_PER_PAGE);
  }

  private prepareUniqueQueryProperties(queryParamMap: Record<any,any>) {
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

  private prepareBlockQueryInQueryProperties(catalogOptions: CatalogOption[], queryParamMap: Record<any,any>) {
    const query: Record<any, any> = this.startBlockQuery(queryParamMap);
    const queryParamMapKeys: string[] = Object.keys(queryParamMap)
      .filter((key) => !this.constants.standardQueryProperties.includes(key));
    queryParamMapKeys.forEach((key) => {
      const keyName: string = this.preparePropertyNameOfTermInBlockQuery(catalogOptions, key);
      const keyValue: any[] = this.preparePropertyValueOfTermInBlockQuery(queryParamMap, key);
      const term = {
        terms:
          {
            [keyName]: keyValue
          }
      };
      query['bool'].must.push(term);
    });
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

  private preparePropertyNameOfTermInBlockQuery(catalogOptions: CatalogOption[], key: string): string {
    const catalogOption: any = catalogOptions.find((item) => item.name == key);
    switch (catalogOption.type) {
      case 'array':
        return 'good_data.' + key + '.name.keyword';
      case 'boolean':
        return 'good_data.' + key;
      default:
        return '';
    }
  }

  private preparePropertyValueOfTermInBlockQuery(queryParamMap: Record<any,any>, key:string): string[] {
    let keyValue: string = queryParamMap[key];
    if(keyValue.includes('Да'))
      keyValue = 'true';
    if(keyValue.includes('Нет'))
      keyValue = 'false';
    return keyValue.split('_');
  }

  private prepareAggregationQueryProperties(catalogOptions: CatalogOption[]): void {
    let aggregations: any = {};
    catalogOptions.forEach((catalogOption) => {
      let fieldName: string;
      if (catalogOption.type == 'array')
        fieldName = 'good_data.' + catalogOption.name + '.id';
      else
        fieldName = 'good_data.' + catalogOption.name;
      const field = { terms: {
          size: AGGREGATION_SIZE,
          field: fieldName
        }
      }
      if(catalogOption.name)
        aggregations[catalogOption.name] = field;
    });
    this._elasticsearchRequestBuilder.addAggregation(aggregations);
  }

}
