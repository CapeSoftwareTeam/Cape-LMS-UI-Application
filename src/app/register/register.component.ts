import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../models/register';
import { RegisterserviceService } from '../services/registerservice.service';
import { CscService } from '../csc.service';


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


  constructor(private formBuilder: FormBuilder,private route: Router,
    private registerService: RegisterserviceService, private siteService:CscService
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

  
//checking empid duplicates 
  empid(event: any){
   this.Empid=this.register.empid;
   
   let tempArr : any=[];
   
   this.registerService.getEmpid().subscribe(
    data => {
   
     tempArr = JSON.parse(data);
     for(let j of tempArr)
     {
      if(j.empid==this.Empid ){
        this.prod=true;
        this.field.empid.setValue("");
      }
       }
         setTimeout(() => {
          this.prod = false;
          
        }, 3000);
        console.log("empid registered")
        
      }
    
     )
    
     }
// checking mobile number duplicates
 mobile(event:any){
 
      this.Mobile= this.register.mobilenumber;
      let  tempArr : any=[];

this.registerService.getEmpid().subscribe(
  data =>{
    tempArr = JSON.parse(data);
    for(let j of tempArr){
     
      if(j.mobilenumber==this.Mobile){
this.prod1=true;
this.field.mobile.setValue("");
setTimeout(() => {
  this.prod1=false;
}, 3000);
console.log("same mobilenumber")
      }
    }
  }
)
           
     }
     //checking alternate mobile number duplicates
 alter(event:any){
 
  this.Alternate = this.register.alternatenumber;
  let tempArr : any=[];
  this. registerService.getEmpid().subscribe(
    data =>{
      tempArr = JSON.parse(data);
      for(let j of tempArr){
        if(j.alternatenumber== this.Alternate){
          this.prod2=true;
          this.field.alternate.setValue("");
          setTimeout(()=>{
            this.prod2=false;
          }, 3000);
          console.log("same alternatenumber")
        }
      }
    }
  )
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
    event.target.value=='arun@capeindia.net'){
      this.Hide=false;
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
  this.register.mobilenumber='+'+ this.countryCode +'-' + this.RegisterationForm.value.mobile
  this.register.alternatenumber='+'+ this.countryCode +'-'+ this.RegisterationForm.value.alternate
  this.register.country=
     this.registerService.saveForm(this.register).subscribe(
      data => {
        this.priyanka=true;
        setTimeout(() => {
          this.priyanka = false;
          this.clear();
          this.submitted = false;
        }, 3000);
        console.log("success")
      },
      error => {
        console.log("bug")
      }
    )

  }
  emailvalidation(e:any){
    if(!(e.target.value).includes('@capeindia.net')){
      console.log('errorr')
    }
  }
  Home(){
    this.route.navigate(['/home']);
  }
}