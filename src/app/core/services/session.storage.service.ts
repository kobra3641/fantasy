import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class SessionStorageService {

  public catalog$: BehaviorSubject<any> = new BehaviorSubject<any>( {})
  public catalogOptions$: BehaviorSubject<any> = new BehaviorSubject<any>( {})
  public holdAggregation$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor() {
    this.loadSubjects();
  }

  private loadSubjects(): void {
    const catalog: any = this.getCatalog();
    const catalogOptions: any = this.getCatalogOptions();
    const holdAggregation: any = this.getHoldAggregation();
    if(catalog) {
      this.catalog$.next(catalog);
    }
    if (catalogOptions)
      this.catalogOptions$.next(catalogOptions);
    if (holdAggregation)
      this.holdAggregation$.next(holdAggregation);
  }

  public setCatalog(catalog: any): void {
    if(catalog) {
      localStorage.setItem('catalog', JSON.stringify(catalog));
      this.catalog$.next(catalog);
    }
  }

  private getCatalog(): any {
    const catalog: string | null = localStorage.getItem('catalog');
    if(catalog)
      return JSON.parse(catalog);
  }

  public setCatalogOptions(catalogOptions: any): void {
    if(catalogOptions) {
      localStorage.setItem('catalogOptions', JSON.stringify(catalogOptions));
      this.catalogOptions$.next(catalogOptions);
    }
  }

  public getCatalogOptions(): any {
    const catalogOptions: string | null = localStorage.getItem('catalogOptions');
    if(catalogOptions) {
      return JSON.parse(catalogOptions);
    }
  }

  public setHoldAggregation(holdAggregation: any): void {
    if(holdAggregation) {
      localStorage.setItem('holdAggregation', JSON.stringify(holdAggregation));
      this.holdAggregation$.next(holdAggregation);
    }
  }

  public getHoldAggregation() {
    const holdAggregation: string | null = localStorage.getItem('holdAggregation');
    if(holdAggregation) {
      return JSON.parse(holdAggregation);
    }
  }
}
