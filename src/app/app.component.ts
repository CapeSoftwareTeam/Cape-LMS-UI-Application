import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  Products:boolean=true;
  afterLogin:boolean=false;
  empid:any;
  constructor(private route:Router){}
  ngOnInit(): void {
    this.empid=sessionStorage.getItem('empid');
  }
  loginPage(){
   this.route.navigate(['/login'])
   this.Products=false;
   this.afterLogin=true;
  }
  callProfile() {
    this.route.navigate(['/profile']);
    this.Products=false;
  }
  callCalculation() {
    this.route.navigate(['/leavestatus']);
    this.Products=false;
  }
  signout(){
    this.route.navigate(['/login']);
    this.Products=false;
    // this.blurMode=true
    // this.spinner=true;
    // this.blurMode=true;
    // setTimeout(() => {  
    //   this.blurMode=false;
    //   this.spinner=false;
     
  // }, 5000);
  
  }
  
  title = 'app';
  
}
