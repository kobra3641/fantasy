import {Injectable} from "@angular/core";

@Injectable()
export class ApiConstants {
  public readonly GOOD_API: string = 'http://localhost:8082/api/goods/';
  public readonly ELASTIC_API: string = 'http://localhost:9200/goods/_search?';
  public readonly CATEGORY_API: string = 'http://localhost:8080/api/category/';
  public readonly standardQueryProperties: string [] = ['sort', 'page', 'catalog_id'];
}
