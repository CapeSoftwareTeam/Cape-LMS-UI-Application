import { getLocaleDateFormat } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  
  constructor(private http: HttpClient) 

  { }
  getForm():Observable<any> {
    return this.http.get<any>('/get',{responseType: 'text' as 'json'});
  }
  saveForm():Observable<any> {
    return this.http.save<any>('/admin',{responseType: 'text' as 'json'});
  }
  deleteForm():Observable<any> {
    return this.http.put<any>( '/delete', {responseType: 'text' as 'json'});
  }
  // updateForm():Observable<any>{
  //   return this.http.update<any>('/update',{responseType:'text' as 'json'});
  // }
}

