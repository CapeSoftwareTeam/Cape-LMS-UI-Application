import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {

  apiurl = environment.apiurl;
  constructor(private http: HttpClient) { }

  getRegisterDetails(empid: any): Observable<any> {
    return this.http.get<any>(this.apiurl + '/getRegister' + '/' + empid, { responseType: 'text' as 'json' });
  }

  updateRegisterDetails(register: Register): Observable<any> {
    return this.http.put<any>(this.apiurl + '/updateRegister', register, { responseType: 'text' as 'json' })
  }

}
