import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService {
  errorMessage: string="";
apphistoryid:any;
leavefileId:any
  constructor() { 
    console.log(this.errorMessage);
  }
}
