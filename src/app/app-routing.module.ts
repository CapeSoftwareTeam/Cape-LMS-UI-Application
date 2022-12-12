import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { HomeComponent } from './home/home.component';
import { LeaveStatusComponent } from './leave-status/leave-status.component';
import { LmsPageComponent } from './lms-page/lms-page.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { HistoryComponent } from './history/history.component';
import { ChangeNumberComponent } from './change-number/change-number.component';
import { PublicHolidaysComponent } from './public-holidays/public-holidays.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeLeaveComponent } from './employee-leave/employee-leave.component';




const routes: Routes = [
{path:'',redirectTo:"/frontpage",pathMatch:'full'},
{path:'register',component:RegisterComponent},
{path:'login',component:LoginComponent},
{path:'forgotpassword',component:ForgotpasswordComponent},
{path:'changepassword',component:ChangePasswordComponent},
{path:'home',component:HomeComponent},
{path:'leavestatus',component:LeaveStatusComponent},
{path:'applyleave',component:ApplyLeaveComponent},
{path:'profile',component:ProfileComponent},
{path:'holidays',component:HolidaysComponent},
{path:'lmspage',component:LmsPageComponent},
{path:'frontpage',component:FrontpageComponent},
{path:'history',component:HistoryComponent},
{path:'change-number',component:ChangeNumberComponent},
{path:'publicholidays',component:PublicHolidaysComponent},
{path:'employeedetails',component:EmployeeDetailsComponent},
{path:'employeeleave',component:EmployeeLeaveComponent},

]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
