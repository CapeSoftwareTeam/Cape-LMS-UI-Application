import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { Site } from './models/site';
@Injectable({
  providedIn: 'root'
})
export class CscService {
  getcitiesByState(value: any, state: (name: string, styles: import("@angular/animations").AnimationStyleMetadata, options?: { params: { [name: string]: any; }; } | undefined) => import("@angular/animations").AnimationStateMetadata): any[] {
    throw new Error('Method not implemented.');
  }
  getStatesByCountry(country: any): any[] {
    throw new Error('Method not implemented.');
  }
  apiurl=environment.apiurl;
  constructor(private http: HttpClient) { }


  public retrieveState(countryName: String): Observable<any> {
    return this.http.get<any>(this.apiurl + '/fetchStatesByCountryCode' + '/' +countryName, { responseType: 'text' as 'json' })
  }
    
  
  public retrieveCountry(): Observable<any> {
    return this.http.get<any>(this.apiurl + '/fetchCountries', { responseType: 'text' as 'json' })
  }
}

