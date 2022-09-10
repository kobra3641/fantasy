import {Injectable} from "@angular/core";
import {ApiConstants} from "../configurations/api.constants";

@Injectable({providedIn: "root"})
export class QueryParametersService {
  constructor(
    private constants: ApiConstants
  ) {}

  public getCurrentQueryParams = (currentQueryParams: any, itemsNotIncluded?: any[]): Record<any,any> => {
    const queryParams: Record<any,any> = {};
    if(currentQueryParams)
      Object.keys(currentQueryParams).forEach((item) => {
        queryParams[item] = currentQueryParams[item];
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

  public updateQueryParams = (queryParams: Record<any,any>, property: string, value: string): any => {
    if(this.constants.standardQueryProperties.includes(property))
      queryParams[property] = value;
    else if(queryParams[property]) {
      queryParams = this.removeStandardQueryProperties(queryParams);
      const valuesByProperty: string[] = queryParams[property].split('_');
      if(valuesByProperty.includes(value)) {
        const afterReplaceValues: string[] = valuesByProperty.filter(item => item != value);
        if(afterReplaceValues.length > 0) {
          queryParams[property] = afterReplaceValues.join('_')
        }
        else {
          delete queryParams[property];
        }
      }
      else {
        queryParams[property] = queryParams[property] + '_' + value;
      }
    }
    else {
      queryParams[property] = value;
      queryParams = this.removeStandardQueryProperties(queryParams);
    }
    return queryParams;
  }

  private removeStandardQueryProperties(queryParams: Record<any,any>): Record<any,any> {
    this.constants.standardQueryProperties.forEach((item: string) => {
      delete queryParams[item];
    });
    return queryParams;
  }

  public checkQueryParamsForStandardQueryProperties(queryParams: Record<any,any>): boolean {
    const queryParametersKeys: string[] = Object.keys(queryParams)
      .filter(item => !this.constants.standardQueryProperties.includes(item));
    return queryParametersKeys.length > 0 ? false : true;
  }

  public sizeFromNumberPage = (page: string): number => {
    let pageNum: number = 1;
    if(page)
      pageNum = Number(page);
    return (pageNum - 1) * 20;
  }

}
