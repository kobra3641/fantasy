import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

const GUIDE_API = 'http://localhost:8080/api/public/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClassifierService {

  constructor(public http: HttpClient) { }

  findSchemaNameAndTableNames(): Observable<any> {
    return this.http.get(GUIDE_API + 'findSchemaNameAndTableNames', httpOptions);
  }

}
