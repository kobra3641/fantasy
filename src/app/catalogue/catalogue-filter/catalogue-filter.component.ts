import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CatalogOption} from "../models/catalog.option";
import {ActivatedRoute, Router} from "@angular/router";
import {QueryParametersService} from "../../core/services/query.parameters.service";
import {Filter} from "../models/filter";
import {QueryParamItem} from "../models/query.param.item";

@Component({
  selector: 'app-catalogue-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './catalogue-filter.component.html',
  styleUrls: ['../catalogue.component.css']
})
export class CatalogueFilterComponent {

  @Input() filter: Filter;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private queryParamsService: QueryParametersService
  ) {}

  public prepareOptionValueName(optionValue: any): any {
      return optionValue.name + ' (' + optionValue.count + ')'
  }

  public setQueryParamsByCheck(catalogOption: any, optionValue: any) {
    const queryParamItem: QueryParamItem = {property: catalogOption.en_name, value: optionValue.name};
    optionValue.active = !optionValue.active;
    this.setQueryParams(queryParamItem);
  }

  public setQueryParamsByRange(catalogOption: any, event: any) {
    let value: string = event.value;
    let queryParamItem: QueryParamItem;
    if (event.id == 'rangeBy')
      queryParamItem = {property: catalogOption.en_name, value: '~' + value, isRange: true, max: true};
    else
      queryParamItem = {property: catalogOption.en_name, value: value + '~', isRange: true, min: true};
    this.setQueryParams(queryParamItem);
  }

  private setQueryParams(queryParamItem: QueryParamItem) {
    const queryParams: Record<any, any> = this.queryParamsService.updateQueryParams(this.activatedRoute.snapshot.queryParams, queryParamItem);
    this.router.navigate([], {queryParams, relativeTo: this.activatedRoute}).then();
  }

  public isExpanded(catalogOption: CatalogOption) {
    return catalogOption?.data.map((item: any) => item.active).includes(true);
  }

  public getMinValue(catalogOption: CatalogOption) {
    const min = catalogOption.data[0]?.min?.toFixed(1);
    return min ? min : 0;
  }

  public getMaxValue(catalogOption: CatalogOption) {
    const max = catalogOption.data[1]?.max?.toFixed(1);
    return max ? max : 0;
  }

  public getCurrentMinValue(catalogOption: CatalogOption) {
    const max = catalogOption.data[0]?.currentMin;
    return max ? max : undefined;
  }

  public getCurrentMaxValue(catalogOption: CatalogOption) {
    const max = catalogOption.data[1]?.currentMax;
    return max ? max : undefined;
  }

}
