import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

const CATEGORY_API = 'http://localhost:8080/api/category/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  public catalog = new BehaviorSubject<any>(undefined);

  constructor(public http: HttpClient, private router: Router) { }

  findAll(): Observable<any> {
    return this.http.get(CATEGORY_API + 'findAll', httpOptions);
  }

  saveCatalog(catalog: any){
    this.catalog.next(catalog);
    console.log(catalog)
  }

  findByName(name: string | null): Observable<any> {
    return this.http.get(CATEGORY_API + 'findByName/' + name, httpOptions);
  }
}
