import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

const CATEGORY_API = 'http://localhost:8080/api/categoryOptions/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CategoryOptionsService {
  constructor(public http: HttpClient) { }

  //
  // findAll(): Observable<any> {
  //   return this.http.get(CATEGORY_API + 'findAll', httpOptions);
  // }

  findOne(id: any): Observable<any> {
    return this.http.get(CATEGORY_API + 'findOne' + `/${id}`, httpOptions);
  }
}
