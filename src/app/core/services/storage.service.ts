import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class StorageService {

  public region$: BehaviorSubject<any> = new BehaviorSubject<any>({rus_name: 'Выберите город'})
  public goodsCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    this.loadSubjects();
  }

  private loadSubjects(): void {
    const region: any = this.getRegion();
    if(region)
      this.region$.next(region);
  }

  public setRegion(region: any): void {
    if(region) {
      localStorage.setItem('region', JSON.stringify(region));
      this.region$.next(region);
    }
  }

  private getRegion(): any {
    const region: string | null = localStorage.getItem('region');
    if(region)
      return JSON.parse(region);
  }

  public setGoodsCount(count: number) {
    this.goodsCount$.next(count);
  }
}
