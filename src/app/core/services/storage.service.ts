import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class StorageService {

  public region$: BehaviorSubject<any> = new BehaviorSubject<any>({rus_name: 'Выберите город'})

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

}
