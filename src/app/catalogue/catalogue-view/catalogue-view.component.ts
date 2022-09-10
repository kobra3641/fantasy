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
import {ElasticResponse} from "../../core/models/elastic.response";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalogue-view',
  templateUrl: './catalogue-view.component.html',
  styleUrls: ['../catalogue.component.css']
})
export class CatalogueViewComponent implements OnInit, OnDestroy {

  public catalog: Catalog | undefined;
  public goods: any;
  public count: any;
  public catalogOptions: CatalogOption[] = [];
  public aggregations: any;
  private _subscriptions = new Subscription();
  public chips: any[] = [];

  constructor(
    private goodsService: GoodsService,
    private categoryService: CategoryService,
    private categoryOptionsService: CategoryOptionsService,
    private elasticsearchQueryManager: ElasticsearchQueryManager,
    private queryParametersService: QueryParametersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private queryParamsService: QueryParametersService,
    private constants: ApiConstants
  ) {
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
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
    const subscription: Subscription = this.activatedRoute.queryParamMap.subscribe({
      next: (queryParamMap: any) => {
        this.initCatalog(catalogName, queryParamMap);
      },
      error: (error) => {
        console.log('error', error);
      },
      complete: () => {
        subscription.unsubscribe();
      }
    });
  }

  private initCatalog(catalogName: string | null, queryParamMap: any) {
    const subscription: Subscription = this.categoryService.findByName(catalogName)
      .pipe(
        tap((catalog: Catalog) => this.catalog = catalog),
        switchMap((catalog: Catalog) => this.categoryOptionsService.findOne(catalog.id)),
      )
      .subscribe({
        next: (catalogOptions: CatalogOption[]) => {
          this.catalogOptions = catalogOptions;
          this.prepareCatalogDataRequest(catalogOptions, queryParamMap);
          this.prepareVisibleChips(catalogOptions, queryParamMap);
        },
        error: (error) => {
          console.log('error', error);
          this.router.navigate(['']).then();
        },
        complete: () => {
          subscription.unsubscribe();
        }
      });
  }

  private prepareCatalogDataRequest(catalogOptions: CatalogOption[], queryParamMap: any) {
    const queryParam: Record<any, any> = this.queryParametersService.getCurrentQueryParams(queryParamMap.params);
    queryParam['catalog_id'] = this.catalog?.id;
    const elasticsearchRequest: ElasticRequest =
      this.elasticsearchQueryManager.createRequest(catalogOptions, queryParam);
    this.initCatalogData(elasticsearchRequest);
  }

  private initCatalogData(elasticsearchRequest: ElasticRequest): void {
    const sub: Subscription = this.goodsService.findAll(elasticsearchRequest).subscribe({
      next: (elasticsearchResponse: ElasticResponse) => {
        this.goods = elasticsearchResponse.hits?.hits;
        this.aggregations = elasticsearchResponse.aggregations;
        this.count = elasticsearchResponse.hits?.total.value;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        sub.unsubscribe();
      }
    });
  }

  private prepareVisibleChips(catalogOptions: CatalogOption[], queryParamMap: any): void {
    this.chips = this.queryParametersService.getCurrentQueryParamsArray(queryParamMap.params,
      this.constants.standardQueryProperties);
    let chipName: string | undefined;
    this.chips.map((item: any) => {
      const catalogOption = catalogOptions.filter((catalogOption) => catalogOption.name == item.name)[0];
      if (catalogOption && chipName && chipName == item.name) {
        item['view_name'] = item.value;
      } else if (catalogOption) {
        chipName = item.name;
        item['view_name'] = catalogOption.rus_name + ': ' + item.value;
      }
      return item;
    })
  }

  public removeMatChip(chip: any): void {
    this.setQueryParams({
      optionName: chip.name,
      optionValue: chip.value
    });
  }

  public removeAllMatChips(): void {
    this.chips = [];
    this.router.navigate([], {queryParams: {}, replaceUrl: true}).then(() => {});
    localStorage.setItem('holdAggregation', '');
  }

  public setQueryParams(event: any): void {
    let queryParams: Record<any, any> = this.queryParamsService.getCurrentQueryParams(this.activatedRoute.snapshot.queryParams);
    queryParams = this.queryParamsService.updateQueryParams(queryParams, event.optionName, event.optionValue);
    if (this.queryParamsService.checkQueryParamsForStandardQueryProperties(queryParams))
      localStorage.setItem('holdAggregation', '');
    this.router.navigate([], {queryParams, replaceUrl: true}).then(() => {
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

}
