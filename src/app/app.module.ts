import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, } from '@angular/common/http';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
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
import { ChangeNumberComponent } from './change-number/change-number.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { HistoryComponent } from './history/history.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenServiceService } from './services/token-service.service';
import { PublicHolidaysComponent } from './public-holidays/public-holidays.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgOtpInputModule } from 'ng-otp-input';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';



import { NgCircleProgressModule } from 'ng-circle-progress';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
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
    ChangeNumberComponent,
    FrontpageComponent,HistoryComponent,
    PublicHolidaysComponent,
    EmployeeDetailsComponent,
    ComingSoonComponent,
   

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
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatMenuModule,
    MatDialogModule,
    MatSortModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgOtpInputModule,
    MatExpansionModule,
   
    NgOtpInputModule,
 
    NgMultiSelectDropDownModule.forRoot(),
  
     NgMultiSelectDropDownModule, NgCircleProgressModule.forRoot({
      "radius": 60,
      "space": -10,
      "outerStrokeGradient": true,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#4882c2",
      "outerStrokeGradientStopColor": "#53a9ff",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 2,
      "title": "Uploading",
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "clockwise": false,
      "startFromZero": true,
      "lazy": true
     })
     
     
      
  


  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenServiceService,
    multi:true
  },{provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },},
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
