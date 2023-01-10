import { Component, OnInit, Type } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../models/register';
import { RegisterserviceService } from '../services/registerservice.service';
import { CscService } from '../csc.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { exclamationSquareFill } from 'ngx-bootstrap-icons';
import { GlobalErrorHandlerService } from '../services/global-error-handler.service';
import { LoginComponent } from '../login/login.component';


interface Country {
  
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  register = new Register();
  fullDate:any;
  priyanka:boolean=false;
  prod:boolean=false;
  prod1:boolean=false;
  prod2:boolean=false;
  prod3:boolean=false;
  RegisterationForm!: FormGroup;
  currentDate:any=new Date();
  Alternate:any;  
  countries: Country[]=[]; 
  states: string[]=[];
  cities: string[]=[];
  Empid:any;
  Email:any;
  Mobile:any;
  countryCode:any;
  stateList1: any=[];
  countryList: any=[];
  Hide:boolean=true;
  showErrorMessage: boolean=false;
  errorMessage: string="";
  superAdmin: boolean=false;
  register1:boolean=true;


  constructor(private formBuilder: FormBuilder,private route: Router,
    private registerService: RegisterserviceService, private siteService:CscService,public globalErrorHandler: GlobalErrorHandlerService,
    private dialog:MatDialog
  ) { 
   
  }
  ngOnInit(): void {
    this.RegisterationForm = new FormGroup({
      empid: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      maritalStatus: new FormControl('', Validators.required),
      mobile: new FormControl('', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
      alternate: new FormControl('', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      dateofjoining: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      totalExperience: new FormControl('', Validators.required),
      country:new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      otherExperience: new FormControl('', Validators.required),
      capeExperience: new FormControl('', Validators.required),
      managername: new FormControl('', Validators.required),
      manageremail: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
     
    })
   
    this.siteService.retrieveCountry().subscribe(
      data => {
        this.countryList = JSON.parse(data);
        console.log( this.countryList)
      }
    )

    this.countryCode='91';
 }
 cities1 = ['Oragadam','Chennai','Nagarcoil','Telugana','Hyderabad','Vishakapattinam',
 'Bengalore','Ernakulam','Bhubaneshwar','Kolkata','Delhi','Pragyaraj','Indore','Mumbai','Pune'];
  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  changeCountry1(e: any) {
     let changedValue;
     if(e.target != undefined) {
     changedValue = e.target.value;
      
     
    }
    else{
     changedValue = e;
    }
    this.stateList1 = [];
    this.register.state = '';
   for(let arr of this.countryList) {
     if( arr.name == changedValue) {
   this.siteService.retrieveState(arr.code).subscribe(
    data => {
   this.stateList1 = JSON.parse(data) 
  
    }
    )};
     }
  }

  


 get field(): any {
  return this.RegisterationForm.controls;
} 
   //checking email duplicates     
   email(event:any){
   
    this.Email=this.register.emailid;
    let tempArr:any=[];
    this.registerService.getEmpid().subscribe(
      data=>{
        tempArr = JSON.parse(data);
        for(let j of tempArr){
          if(j.emailid==this.Email){
            this.prod3 = true;
            this.field.email.setValue("");
            setTimeout(()=>{
              this.prod3=false;
            },3000);
            console.log("same email")
          }
        }
      }

    )
   }

   getemail(event:any){
    
    if(event.target.value=='gk@capeindia.net'|| event.target.value=='srp@capeindia.net'||
    event.target.value=='asha@capeindia.net'||event.target.value=='vasanthi@capeindia.net'||
    event.target.value=='arun@capeindia.net'||event.target.value=='awstesting@rushforsafety.com' ){
      this.Hide=false;
      
  this.superAdmin=true;

      this.field.manageremail.clearValidators();
this.field.manageremail.updateValueAndValidity();
this.field.managername.clearValidators();
this.field.managername.updateValueAndValidity();
this.field.totalExperience.clearValidators();
this.field.totalExperience.updateValueAndValidity();
this.field.otherExperience.clearValidators();
this.field.otherExperience.updateValueAndValidity();
this.field.capeExperience.clearValidators();
this.field.capeExperience.updateValueAndValidity();
    }
    else{
      this.Hide=true;
    }
      

  }

  
changevalue(e:any){
  if(
    this.RegisterationForm.value.otherExperience!=''&&
    this.RegisterationForm.value.otherExperience!=undefined&&
    this.RegisterationForm.value.dateofjoining!=''&&
    this.RegisterationForm.value.dateofjoining!=undefined
  ){
    var currentDate=new Date();
    var fullDate=new Date(this.register.dateofjoining);
    var capeExperience=Math.floor(
      currentDate.getTime()-fullDate.getTime());
    var day= 1000* 60 * 60 * 24;
    var days = Math.floor(capeExperience/day);
    var months = Math.floor(days/31);
    var years = Math.floor(months/12);
    var m = months% 12;
    this.register.capeexperience=Math.floor(months/12)+'.'+m;
    this.register.totalexperience = +this.register.capeexperience+ +this.register.otherexperience;
  }

}
countryChange(country: any) {
  this.countryCode = country.dialCode;
}

clear(){
  this.RegisterationForm.reset();
}
  submitFunction() {

  
    this.submitted = true;
   



    if (this.RegisterationForm.invalid) {
      return
    }
    let tempArr : any=[];
   
   
    
  this.register.mobilenumber='+'+ this.countryCode +'-' + this.RegisterationForm.value.mobile
  this.register.alternatenumber='+'+ this.countryCode +'-'+ this.RegisterationForm.value.alternate
 
     this.registerService.saveForm(this.register).subscribe(
      data => {
        this.register.mobilenumber=this.register.mobilenumber.split('-')[1]
        this.register.alternatenumber=this.register.alternatenumber.split('-')[1]
        this.priyanka=true;
        setTimeout(() => {
          // this.priyanka = false;
          // this.clear();
          // this.submitted = false;
          
 if(sessionStorage.getItem("token") !=null){
   this.priyanka = false;
 this.clear();
 this.submitted = false;
}else {
  this.globalErrorHandler.register=false;
  this.globalErrorHandler.frontPage=true;
 const dialogRef=this.dialog.open(LoginComponent,{
disableClose: true
});
 dialogRef.afterClosed().subscribe(data=>{

})
}


        }, 3000);
        console.log("success")
      },
      error => {
        this.register.mobilenumber=this.register.mobilenumber.split('-')[1]
        this.register.alternatenumber=this.register.alternatenumber.split('-')[1]
        this.showErrorMessage=true;

        this.errorMessage=this.globalErrorHandler.errorMessage;
  
        setTimeout(() => {
  
          this.showErrorMessage=false;
  
        }, 3000);
      }
    )
    

  }
 
  emailvalidation(e:any){
    if(!(e.target.value).includes('@capeindia.net')){
      console.log('errorr')
    }
  }
  Home(){
  
  }
 
}