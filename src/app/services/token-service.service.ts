import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable,Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { ProfileserviceService } from './profileservice.service';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService implements HttpInterceptor{

  constructor(private injector:Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if(sessionStorage.getItem("token") ==null || !this.loginService.isLogin){
      if(sessionStorage.getItem("token") !=null){
        let profileService=this.injector.get(ProfileserviceService);
        let tokenzedReq=req.clone({
          setHeaders:{
            Authorization:`Bearer ${profileService.getToken()} `
          }
        })
      return next.handle(tokenzedReq);
      }
        return next.handle(req);
    }
}
