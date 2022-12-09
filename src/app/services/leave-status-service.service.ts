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

  getUpdates():Observable<any>{
    return this.http.get<any>(this.apiurl+"/"+'history2',{responseType:'text' as'json'});
  }
  statusUpdate(historyId:Number,empid:String,status:string):Observable<any>{
    return this.http.put<any>(this.apiurl+"/"+'hrapprove'+"/"+historyId+"/"+empid+"/"+status,{responseType:'text' as 'json'});
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
  deleteHistory(historyId:Number):Observable<any>{
    return this.http.delete<any>(this.apiurl + "/mystatusDel" + "/" + historyId,{responseType:'text' as 'json'});
 }

}