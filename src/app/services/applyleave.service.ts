import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplyLeave } from '../models/apply-leave.model';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class ApplyleaveService {
  apiurl=environment.apiurl_history;
  constructor(private http:HttpClient) { }
  
  leaveRegister(applyleave:ApplyLeave):Observable<any>{
    return this.http.post<any>(this.apiurl+"/"+'history',applyleave,{responseType:'text' as 'json'});
  }

  getInfo(empid:String):Observable<any>{
    return this.http.get<any>(this.apiurl+'/'+"history4"+'/'+empid,{responseType:'text' as 'json'});
  }
  leaveTracking(empid: string): Observable<any> {
      return this.http.get<any>(this.apiurl + '/' + "getLeavedetails" +'/' +empid,{responseType: 'text' as 'json'})
  }
  getMemberDetails(empid:String):Observable<any>{
    return this.http.get<any>(this.apiurl + '/' + "getMemberdetails" + '/'+empid,{responseType:'text' as 'json'});
  }
  }

