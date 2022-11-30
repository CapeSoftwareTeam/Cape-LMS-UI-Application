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
  getForm(empid:any):Observable<any> {
    return this.http.get<any>(this.apiurl+'/getRegister' +'/'+empid,{responseType: 'text' as 'json'});
  }
  saveForm(register: Register):Observable<any> {
    return this.http.post<any>(this.apiurl+'/addRegister',register,{responseType: 'text' as 'json'});
  }
  deleteForm(id: any):Observable<any> {
    return this.http.put<any>( this.apiurl+'/deleteRegister' + '/' +id, {responseType: 'text' as 'json'});
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
  sendOtp(userName:any):Observable<any>{
    return this.http.get<any>(this.apiurl+'/sendotp'+'/'+userName,{ responseType:'text' as 'json'})
  }
  updatePassWord(email:any,passWord:any):Observable<any>{
    return this.http.put<any>(this.apiurl+'/updatePassword'+'/'+email+'/'+passWord,{responseType:'text' as 'json'})
  }

  getEmpid():Observable<any>{
       return this.http.get<any>(this.apiurl+ '/empid', {responseType: 'text' as 'json'})
       
     }

  verifyOtp (user: User): Observable<any> {
      return this.http.put<any>(this.apiurl+'/verifyOtp' ,user, { responseType: 'text' as 'json' })
    }
  changePassword(user:User):Observable<any>{
    return this.http.put<any>(this.apiurl+'/changePassword',user,{responseType:'text' as 'json'})
  }

  }




