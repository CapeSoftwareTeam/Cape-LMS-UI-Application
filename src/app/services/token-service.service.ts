import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable,Injector } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { GlobalErrorHandlerService } from '../services/global-error-handler.service';
import { LoginComponent } from '../login/login.component';
import { ProfileserviceService } from './profileservice.service';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService implements HttpInterceptor{

  constructor(private injector:Injector,
              private globalErrorHandler: GlobalErrorHandlerService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if(sessionStorage.getItem("token") !=null){
        let profileService=this.injector.get(ProfileserviceService);
        let tokenzedReq=req.clone({
          setHeaders:{
            Authorization:`Bearer ${profileService.getToken()} `
          }
        })
      return next.handle(tokenzedReq).pipe(
        catchError((error:HttpErrorResponse)=>
        {
          const errorMessage=this.errorSet(error)
          this.globalErrorHandler.errorMessage=errorMessage;
          return throwError( ()=>new Error (this.globalErrorHandler.errorMessage));
        })
      )
      }
        return next.handle(req).pipe(
          catchError((error:HttpErrorResponse)=>
          {
            const errorMessage=this.errorSet(error)
            this.globalErrorHandler.errorMessage=errorMessage
            return throwError( ()=>new Error (this.globalErrorHandler.errorMessage));
          })
        )
        }
    errorSet(error:HttpErrorResponse):string{
    let errorMessage='Something went wrong, Please try again later';

    if(error.error instanceof ErrorEvent){
      // client side error
        errorMessage=error.error.message;

    }
    else if(error.status==404){
          errorMessage="file not Found"
    }
    else if(error.status==500){
      errorMessage="Something went wrong, Please try again later"
    }
    else{
      
      // server side error
      if(error.status!=0 &&error.error.message==undefined){
        
        errorMessage=JSON.parse(error.error).message;
      }
      else if(error.error.message !='' &&error.error.message!=undefined){
        errorMessage=error.error.message;
      }
    }
   return errorMessage; 
  }
}
