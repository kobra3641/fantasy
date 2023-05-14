import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {ElasticResponse} from "../models/elastic.response";

const ELASTIC_API = 'http://localhost:9200/goods/_search?';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class GoodsService {
  constructor(public http: HttpClient) { }

  findAll(params: any): Observable<ElasticResponse> {
    return this.http.post(ELASTIC_API, params, httpOptions);
  }

}
