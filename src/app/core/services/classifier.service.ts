import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

const GUIDE_API = 'http://localhost:8080/api/guide/findOne'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ClassifierService {
  constructor(public http: HttpClient) { }

  findOne(params: any): Observable<any> {
    return this.http.get(GUIDE_API, {
      params,
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
  }
}
