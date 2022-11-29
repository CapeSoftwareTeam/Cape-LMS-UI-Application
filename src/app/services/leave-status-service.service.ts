import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveStatusServiceService {
  apiurl=environment.apiurl_history;
  constructor(private http:HttpClient) { }

  getUpdates(department:string):Observable<any>{
    return this.http.get<any>(this.apiurl+"/"+'history2'+"/"+department,{responseType:'text' as'json'});
  }
  statusUpdate(historyId:Number,status:string):Observable<any>{
    return this.http.put<any>(this.apiurl+"/"+'hrapprove'+"/"+historyId+"/"+status,{responseType:'text' as 'json'});
  }
  getMemberDetails(empid:String):Observable<any>{
    return this.http.get<any>(this.apiurl + '/' + "getMemberdetails" + '/'+empid,{responseType:'text' as 'json'});
  }
  getExpLeaveDetails(empid:String):Observable<any>{
    return this.http.get<any>(this.apiurl + "/leaveDetails" + '/'+ empid,{responseType: 'text' as 'json'});
  }
  separationDetails(empid:String):Observable<any>{
    return this.http.get<any>(this.apiurl + "/matseparation" + "/" + empid,{responseType:'text' as 'json'});
  }
  ApprovalDetails(empid:String):Observable<any>{
    return this.http.get<any>(this.apiurl + "/matAprrovalseparation" + "/" + empid,{responseType:'text' as 'json'});
  }
}