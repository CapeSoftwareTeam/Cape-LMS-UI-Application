import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';

import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { CalculationPipe } from './pipe/calculation.pipe';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent, 
    RegisterComponent, 
    CalculationPipe,
    ForgotpasswordComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,ReactiveFormsModule,
 HttpClientModule, MatRadioModule,
     
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
