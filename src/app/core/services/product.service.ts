import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {ElasticResponse} from "../models/elastic.response";

const ELASTIC_API = 'http://localhost:9200/goods/_search?';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  public catalog = new BehaviorSubject<any>(undefined);

  constructor(public http: HttpClient, private router: Router) { }

  findById(id: any): Observable<ElasticResponse> {
    return this.http.post(ELASTIC_API, {
      "query": {
        "bool": {
          "filter": {
            "term": {
              "_id": id
            }
          }
        }
      }
    }, httpOptions);
  }
}
