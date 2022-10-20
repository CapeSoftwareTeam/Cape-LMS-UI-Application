import { getLocaleDateFormat } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  
  constructor(private http: HttpClient) 

  { }
  getForm():Observable<any> {
    return this.http.get<any>('/getRegister',{responseType: 'text' as 'json'});
  }
  saveForm():Observable<any> {
    return this.http.post<any>('/addRegister',{responseType: 'text' as 'json'});
  }
  deleteForm(id: any):Observable<any> {
    return this.http.put<any>( '/deleteRegister' + '/' +id, {responseType: 'text' as 'json'});
  }
  // updateForm():Observable<any>{
  //   return this.http.update<any>('/update',{responseType:'text' as 'json'});
  // }
}

