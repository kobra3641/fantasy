import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class CommonService {
  constructor() {}
  public isEmptyObject = (obj: any): boolean => {return (obj && (Object.keys(obj).length === 0))};
}
