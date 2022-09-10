import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {ElasticResponse} from "../models/elastic.response";

const CATEGORY_API = 'http://localhost:8082/api/goods/';
const ELASTIC_API = 'http://localhost:9200/goods/_search?';
const ELASTICSCROLL_API = 'http://localhost:9200/_search/scroll';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class GoodsService {
  constructor(public http: HttpClient) { }


  createRangeByCatalogId(range: number, catalogId: number): Observable<any> {
    return this.http.get(CATEGORY_API + range + '/' + catalogId, httpOptions);
  }

  getAllByCatalogId(params: any): Observable<any> {
    return this.http.get(CATEGORY_API + 'getAllByCatalogId', {
      params
    });
  }

  // getElasticDataByScroll(params: any): Observable<ElasticResponse> {
  //   return this.http.post(ELASTICSCROLL_API, params, httpOptions)
  // }
  //
  findAll(params: any): Observable<ElasticResponse> {
    return this.http.post(ELASTIC_API, params, httpOptions);

  }
}
