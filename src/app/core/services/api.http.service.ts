import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class ApiHttpService {
  constructor(private http: HttpClient) {}
  public get = (url: string, options?: any): Observable<any> => this.http.get(url, options);
  public post = (url: string, data: any, options?: any): Observable<any> => this.http.post(url, data, options);
  public put = (url: string, data: any, options?: any): Observable<any> => this.http.put(url, data, options);
  public delete = (url: string, options?: any): Observable<any> => this.http.delete(url, options);
}
