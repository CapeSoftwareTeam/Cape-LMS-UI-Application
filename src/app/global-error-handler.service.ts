import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService {
  errorMessage: string="";

  constructor() { 
    console.log(this.errorMessage);
  }
}
