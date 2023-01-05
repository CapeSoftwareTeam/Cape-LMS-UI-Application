import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  
  apiurl=environment.apiurl;
  constructor(private http: HttpClient) { }
  getChat(chat:any):Observable<any> {
    return this.http.post<any>(this.apiurl+'/chatbot' +'/'+chat,{responseType: 'text' as 'json'});
  }
}
