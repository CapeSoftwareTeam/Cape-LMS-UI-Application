import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { MatTableModule } from '@angular/material/table';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { CalculationPipe } from './pipe/calculation.pipe';
import { LoginComponent } from './login/login.component';
import {MatSortModule} from '@angular/material/sort';

import { MatToolbarModule } from '@angular/material/toolbar';
import { LeaveStatusComponent } from './leave-status/leave-status.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { HomeComponent } from './home/home.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'
import { HolidaysComponent } from './holidays/holidays.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LmsPageComponent } from './lms-page/lms-page.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { IntlInputPhoneModule } from 'intl-input-phone';

import { FrontpageComponent } from './frontpage/frontpage.component';
import { HistoryComponent } from './history/history.component';






@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CalculationPipe,
    ForgotpasswordComponent,
    LoginComponent,

    LeaveStatusComponent,
    ApplyLeaveComponent,
    HomeComponent,
    ProfileComponent,
    ChangePasswordComponent,
    HolidaysComponent,
    LmsPageComponent,

    FrontpageComponent,HistoryComponent
      
  
  
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatRadioModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
    MatBadgeModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,MatInputModule,
    MatFormFieldModule,
    Ng2TelInputModule,IntlInputPhoneModule,MatSortModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
