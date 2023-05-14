import {Injectable} from "@angular/core";
import {ApiConstants} from "../configurations/api.constants";
import {QueryParamItem} from "../../catalogue/models/query.param.item";
import {ParamMap} from "@angular/router";

@Injectable({providedIn: "root"})
export class QueryParametersService {

  constructor(
    private constants: ApiConstants
  ) {}

  public getCurrentQueryParams = (currentQueryParams: ParamMap, itemsNotIncluded?: any[]): Record<any,any> => {
    const queryParams: Record<any,any> = {};
    if(currentQueryParams)
      Object.keys(currentQueryParams.keys).forEach((item) => {
        queryParams[item] = currentQueryParams.get(item);
        if(itemsNotIncluded && itemsNotIncluded.includes(item))
          delete queryParams[item];
      });
    return queryParams;
  }

  public getCurrentQueryParamsArray = (currentQueryParams: any, itemsNotIncluded?: any[]): any[] => {
    let chips: any[] = [];
    if(currentQueryParams)
      Object.keys(currentQueryParams).forEach((item) => {
        const keyValues = currentQueryParams[item].split('_');
        let chip: any = {};
        keyValues.forEach((value: string) => {
            chip = {
              name: item,
              value: value
            };
            chips.push(chip);
        })
        if(itemsNotIncluded && itemsNotIncluded.includes(item))
          chips = chips.filter((item) => item != chip);
      });
    return chips;
  }

  public updateQueryParams = (currentQueryParams: any, updateItem: QueryParamItem): any => {
    let queryParams: Record<any,any> = this.getCurrentQueryParams(currentQueryParams);
    if(this.constants.standardQueryProperties.includes(updateItem.property))
      this.updateStandardQueryProperties(queryParams, updateItem);
    else if(queryParams[updateItem.property]) {
      queryParams = this.updateUniqueQueryParams(queryParams, updateItem);
    }
    else {
      queryParams = this.addUniqueQueryProperties(queryParams, updateItem);
    }
    return queryParams;
  }

  private removeStandardQueryProperties(queryParams: Record<any,any>): Record<any,any> {
    this.constants.standardQueryProperties.forEach((item: string) => {
      delete queryParams[item];
    });
    return queryParams;
  }

  public sizeFromNumberPage = (page: string): number => {
    let pageNum: number = 1;
    if(page)
      pageNum = Number(page);
    return (pageNum - 1) * 30;
  }

  private updateStandardQueryProperties(queryParams: Record<any, any>, updateItem: QueryParamItem) {
    queryParams[updateItem.property] = updateItem.value;
  }

  private addUniqueQueryProperties(queryParams: Record<any, any>, updateItem: QueryParamItem): Record<any, any> {
    queryParams[updateItem.property] = updateItem.value;
    return this.removeStandardQueryProperties(queryParams);
  }

  private updateUniqueQueryParams(queryParams: Record<any, any>, updateItem: QueryParamItem): Record<any, any> {
    queryParams = this.removeStandardQueryProperties(queryParams);
    if(updateItem.isRange)
      queryParams = this.updateUniqueRangeQueryParam(queryParams, updateItem);
    else
      this.updateUniqueArrayQueryParams(queryParams, updateItem);
    return queryParams;
  }

  private updateUniqueRangeQueryParam(queryParams: Record<any, any>, updateItem: QueryParamItem): Record<any, any> {
    const value: string = queryParams[updateItem.property];
    let updateItemValue: string;
    if(updateItem.max) {
      updateItemValue = value.split('~')[0] + updateItem.value;
    }
    else {
      updateItemValue = updateItem.value + value.split('~')[1];
    }
    if(updateItemValue.length === 1)
      delete queryParams[updateItem.property];
    else
      queryParams[updateItem.property] = updateItemValue;
    return queryParams;
  }

  private updateUniqueArrayQueryParams(queryParams: Record<any, any>, updateItem: QueryParamItem): Record<any, any> {
    let valuesByProperty: string[] = queryParams[updateItem.property].split('_');
    if(valuesByProperty.includes(updateItem.value)) {
      const afterReplaceValues: string[] = valuesByProperty.filter(item => item != updateItem.value);
      if(afterReplaceValues.length > 0) {
        queryParams[updateItem.property] = afterReplaceValues.join('_');
      }
      else {
        delete queryParams[updateItem.property];
      }
    }
    else
      queryParams[updateItem.property] = queryParams[updateItem.property] + '_' + updateItem.value;
    return queryParams;
  }
}
