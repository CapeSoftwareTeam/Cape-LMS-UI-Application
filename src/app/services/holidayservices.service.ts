import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Holiday } from '../models/holiday';


@Injectable({
  providedIn: 'root'
})
export class HolidayservicesService {

  apiurl=environment.apiurl;
  constructor(private http: HttpClient )
 { }
  
 getLeave():Observable<any> {
  return this.http.get<any>(this.apiurl+'/getPublicHolidays',{responseType: 'text' as 'json'});
}
saveLeave(holiday: Holiday):Observable<any> {
  return this.http.post<any>(this.apiurl+'/addPublicHolidays',holiday,{responseType: 'text' as 'json'});
}
deleteLeave(id: any):Observable<any> {
  return this.http.delete<any>( this.apiurl+'/deletedPublicHolidays' + '/' +id, {responseType: 'text' as 'json'});
}
// updateLeave(holiday:Holiday):Observable<any>{
//   return this.http.put<any>(this.apiurl+'/updatePublicHolidays',{responseType: 'text' as 'json'});
// }

}
