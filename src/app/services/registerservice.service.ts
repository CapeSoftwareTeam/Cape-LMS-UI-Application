import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Register } from '../models/register';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterserviceService {
  
 apiurl=environment.apiurl;
  constructor(private http: HttpClient )

  { }
  getForm(empId:any):Observable<any> {
    return this.http.get<any>(this.apiurl+'/getRegister' + '/' +empId,{responseType: 'text' as 'json'});
  }
  saveForm(register: Register):Observable<any> {
    return this.http.post<any>(this.apiurl+'/addRegister',register,{responseType: 'text' as 'json'});
  }
  deleteForm(id: any):Observable<any> {
    return this.http.put<any>( this.apiurl+'/deleteRegister' + '/' +id, {responseType: 'text' as 'json'});
  }
  getMemberDetails(empid:String):Observable<any>{
    return this.http.get<any>(this.apiurl + '/' + "getMemberdetails" + '/'+empid,{responseType:'text' as 'json'});
  }
  // updateForm():Observable<any>{
  //   return this.http.update<any>('/update',{responseType:'text' as 'json'});
  // }
  authenticate(user:User){
return this.http.post<any>(this.apiurl+'/authenticate',user,{responseType: 'text' as 'json'}) 
  // data=>{

  // }
//})
 
  }
}



