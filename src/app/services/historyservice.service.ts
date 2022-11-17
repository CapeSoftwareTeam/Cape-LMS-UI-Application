import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  
  apiurl=environment.apiurl_history;
  constructor(private http: HttpClient) { }

  getHistory():Observable<any> {
    return this.http.get<any>(this.apiurl+'/history',{responseType: 'text' as 'json'});
  }

  deleteHistory(historyId:any):Observable<any>{
    return this.http.delete<any>(this.apiurl+'/history3'+'/' + historyId, {responseType: 'text' as 'json'});

  }
  getHistory1(empid:any):Observable<any>{
    return this.http.get<any>(this.apiurl+'/history2'+'/' + empid, {responseType: 'text' as 'json'});
  }
}
