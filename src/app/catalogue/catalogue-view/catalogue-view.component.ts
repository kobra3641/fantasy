import {Component, OnDestroy, OnInit} from '@angular/core';
import {Catalog} from "../models/catalog";
import {CatalogOption} from "../models/catalog.option";
import {GoodsService} from "../../core/services/goods.service";
import {CategoryService} from "../../core/services/category.service";
import {CategoryOptionsService} from "../../core/services/categoryOptions.service";
import {ElasticsearchQueryManager} from "../../core/services/elasticsearch.query.manager";
import {QueryParametersService} from "../../core/services/query.parameters.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ApiConstants} from "../../core/configurations/api.constants";
import {switchMap, tap} from "rxjs/operators";
import {ElasticRequest} from "../../core/models/elastic.request";
import {ElasticResponse, Hit} from "../../core/models/elastic.response";
import { Subscription } from 'rxjs';
import {SessionStorageService} from "../../core/services/session.storage.service";
import {Filter} from "../models/filter";
import {Item} from "../models/item";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-catalogue-view',
  templateUrl: './catalogue-view.component.html',
  styleUrls: ['../catalogue.component.css']
})
export class CatalogueViewComponent implements OnInit, OnDestroy {

  public catalog: Catalog | undefined;
  private _subscriptions = new Subscription();
  public filter: Filter = {};
  public item: Item;

  constructor(
    private goodsService: GoodsService,
    private categoryService: CategoryService,
    private categoryOptionsService: CategoryOptionsService,
    private elasticsearchQueryManager: ElasticsearchQueryManager,
    private queryParametersService: QueryParametersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private queryParamsService: QueryParametersService,
    private constants: ApiConstants,
    private sessionStorageService: SessionStorageService,
    private titleService: Title
  ) {
  }

  ngOnInit(): void {
    this._subscriptions.add(
      this.activatedRoute.paramMap.subscribe({
        next: (paramMap: ParamMap) => {
          const catalogName: string | null = paramMap.get('catalogName');
          this.initQueryParams(catalogName);
        },
        error: (error) => {
          console.log('error', error);
        }
      })
    );
  }

  private initQueryParams(catalogName: string | null) {
    this._subscriptions.add(
      this.activatedRoute.queryParamMap.subscribe({
        next: (queryParamMap: ParamMap) => {
          this.initCatalog(catalogName, queryParamMap);
        },
        error: (error) => {
          console.log('error', error);
        }
      })
    );
  }

  private initCatalog(catalogName: string | null, queryParamMap: ParamMap) {
    this._subscriptions.add(
      this.categoryService.findByName(catalogName)
      .pipe(
        tap((catalog: Catalog) => {
          this.catalog = catalog
          this.titleService.setTitle(this.catalog.name);
        }),
        switchMap((catalog: Catalog) => this.categoryOptionsService.findOne(catalog.id))
      )
      .subscribe({
        next: (catalogOptions: CatalogOption[]) => {
          this.prepareCatalogDataRequest(catalogOptions, queryParamMap);
        },
        error: (error) => {
          console.log('error', error);
          this.router.navigate(['']).then();
        }
      })
    );
  }

  private prepareCatalogDataRequest(catalogOptions: CatalogOption[], queryParamMap: ParamMap) {
    const queryParam: Record<any, any> = this.queryParametersService.getCurrentQueryParams(queryParamMap);
    queryParam['catalog_id'] = this.catalog?.id;
    const elasticsearchRequest: ElasticRequest =
      this.elasticsearchQueryManager.createRequest(catalogOptions, queryParam);
    this.initCatalogData(elasticsearchRequest, catalogOptions);
  }

  private initCatalogData(elasticsearchRequest: ElasticRequest, catalogOptions: CatalogOption[]): void {
    this._subscriptions.add(
      this.goodsService.findAll(elasticsearchRequest).subscribe({
          next: (elasticsearchResponse: ElasticResponse) => {
            this.initFilter(catalogOptions, elasticsearchResponse.aggregations, elasticsearchRequest);
            this.initItems(elasticsearchResponse?.hits?.hits, elasticsearchResponse.hits?.total.value);
          },
          error: (error) => {
            console.log(error);
          }
      })
    );
  }

  private initFilter(catalogOptions: CatalogOption[], aggregations: any, elasticsearchRequest: ElasticRequest) {
    Promise<CatalogOption[]>.all(
      catalogOptions.map(async (catalogOption: CatalogOption) => {
        catalogOption.data = await this.initClassifiers(catalogOption.json_agg, catalogOption, aggregations, elasticsearchRequest);
        return catalogOption;
      })).then((data) => {
        this.filter = {
          catalogOptions: data
        }
    });
  }

  private async initClassifiers(classifiers: any[], catalogOption: CatalogOption, aggregations: any, elasticsearchRequest: ElasticRequest): Promise<any[]> {
    let buckets: any[] = [];
    if(catalogOption.en_name) {
      buckets = aggregations[catalogOption.en_name]?.buckets;
      if (!buckets)
        buckets = aggregations[catalogOption.en_name]?.aggs?.buckets;
    }
    if(catalogOption.type == 'number' && catalogOption.schema_name?.includes('range')) {
      const filter: any = elasticsearchRequest?.['post_filter']?.bool?.must?.filter((item:any) => item['range'] && item['range']['good_data.' + catalogOption.en_name])[0];
      const currentValue: any = filter?.['range']?.['good_data.' + catalogOption.en_name];
      let minValue: any = aggregations[catalogOption.en_name + '_min']?.value ?
        aggregations[catalogOption.en_name + '_min']?.value :
        aggregations[catalogOption.en_name + '_min']?.aggs?.value;
      let maxValue: any = aggregations[catalogOption.en_name + '_max']?.value ?
        aggregations[catalogOption.en_name + '_max']?.value :
        aggregations[catalogOption.en_name + '_max']?.aggs?.value;
      classifiers = [{'min': minValue, 'currentMin': currentValue?.gte}, {'max': maxValue, 'currentMax': currentValue?.lte}];
    }
    else {
      for (const classifier of classifiers) {
        await this.initCount(catalogOption, classifier, buckets);
        await this.initActivity(catalogOption, classifier);
      }
    }
    return classifiers;
  }

  private async initCount(catalogOption: CatalogOption, classifier: any, buckets: any[]) {
    let count: any;
    if(catalogOption.type == 'array')
      count = buckets.find((lockItem: any) => classifier.name == lockItem.key);
    else
      count = buckets.find((lockItem: any) => classifier.id == lockItem.key_as_string);
    if(count && count.doc_count)
      classifier['count'] = count.doc_count;
    else
      classifier['count'] = 0;
  }

  private async initActivity(catalogOption: CatalogOption, classifier: any) {
    classifier['active'] = false;
    if(catalogOption.en_name && this.activatedRoute.snapshot.queryParams[catalogOption.en_name]) {
      const queryParam: any[] = [] = this.activatedRoute.snapshot.queryParams[catalogOption.en_name].split('_');
      if(queryParam.find((item) => item == (classifier.name))) {
        classifier['active'] = true;
      }
    }
  }

  private initItems(hits: Hit[] | undefined, value: number | undefined) {
    this.item = {goods: hits || [], count: value || 0};
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

}
