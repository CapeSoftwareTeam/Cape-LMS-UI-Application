import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ConfigurationOptions, CustomCountryModel, TooltipOptionsEnum } from 'intl-input-phone';
import { RegisterserviceService } from '../services/registerservice.service';
import { User } from '../models/user';


// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  modalReference: any;
  submitted:boolean=false;
  submit:boolean=false;
  errorMsg: boolean=false;
  showErrorMessage=false;
  sentOtp:boolean = false;
  disable:boolean=true;
  configOption1: ConfigurationOptions;
  selectedCountryList : CustomCountryModel[] = [];
  public token: string = '';
  isLogin:boolean=false;
  email:any;
  mobileNumber:any;
  afterOtp:boolean=true;
  // configOption2!: ConfigurationOptions;
  // configOption3! : ConfigurationOptions;

  countryCode:string='';
  user=new User();
  // Number:string='';

  loginForm=new FormGroup({
  empid:new FormControl(''),
  password:new FormControl(''),userValidation:new FormControl(''),emailidLogin:new FormControl(''),mobileNumberLogin:new FormControl('')

  })
  otpgenerateform=new FormGroup({ mobileNumber:new FormControl(''),
  otp:new FormControl(''),emailid:new FormControl('')})
  otp: boolean=false;
  loginPage:boolean=true;
  constructor(private modalService: NgbModal ,
    private formbuilder:FormBuilder,private route:Router,private registerService:RegisterserviceService) { 
      this.configOption1 = new ConfigurationOptions();
      this.configOption1.SelectorClass = "ToolTipType1";
    }
   
    

  ngOnInit(): void {
    
    this.loginForm=this.formbuilder.group({
      userValidation:['',[Validators.required]],
      empid:['',[Validators.required]],
    
      mobileNumberLogin: ['',[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.required]],
      emailidLogin:['',[Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}"),Validators.required]],
      password:['',[Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),Validators.required]]
  });
  this.otpgenerateform=this.formbuilder.group({
    mobileNumber: ['',[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      otp:['',Validators.required],emailid:['',Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}")]
  })

  // this.configOption1 = new ConfigurationOptions();
  // this.configOption2 = new ConfigurationOptions();
  // this.configOption3 = new ConfigurationOptions();
  }

  
disable1 : boolean = false;
  otpValidation(){
    this.disable1 = true;
    this.otp=true;
    this.loginPage=false;

    // this.modalReference = this.modalService.open(otpGenerate)
  }
  onCancel() {
    this.disable1 = false;
    this.otp=false
    this.loginPage=true;
  }
  onCountryChange(country: any) {
    this.countryCode = country.dialCode;
  }
  
login(event:any){
 
  this.submitted=true;

  
    // this.user.emailid
  // this.user.emailid = this.loginForm.value.emailidLogin;


  if(this.loginForm.value.emailidLogin?.length==0 ||this.loginForm.value.empid?.length==0 ||this.loginForm.value.emailidLogin?.length==0){
    this.submitted=true;
  }
  
  // let mobileNumber: any
  // mobileNumber = this.user.mobileNumber;
  // this.user.mobileNumber= mobileNumber.Number;
 
    this.registerService.authenticate( this.user).subscribe(data=>{
      
      this.isLogin = true;
      sessionStorage.setItem('empid',JSON.parse(data).register.empid);
      
      sessionStorage.setItem('token',JSON.parse(data).token);
       sessionStorage.setItem('token',JSON.parse(data).token);
      this.route.navigate(['/home']);
    
    // }, error => {
    //   if(error.error.error == 'Unauthorized'){
    //     error.error.error = 'Invalid Credentials';
    //     this.showErrorMessage=error.error.error;
    //   } else{
    //     this.showErrorMessage=error.error.message;
    //   }
      
     
    })
   

  // if(this.loginForm.invalid) {
  //   return;
  // }

}
submitForm(){
  this.submit=true;


  if(this.otpgenerateform.invalid) {
    return;
  }
}
generate(){
  
  this.submit=true;
  

 
 
  if(this.otpgenerateform.value.emailid?.length==0 && this.otpgenerateform.value.mobileNumber?.length==0 ||this.otpgenerateform.value.emailid?.valueOf==undefined
    ||this.otpgenerateform.value.mobileNumber?.valueOf==undefined ){
    this.errorMsg=true;
    setTimeout(() => {
      this.errorMsg=false;
    }, 3000);
     
  }
  
  this.email=this.otpgenerateform.value.emailid;
 
  this.mobileNumber= this.otpgenerateform.value.mobileNumber


  this.registerService.sendOtp(this.email,this.mobileNumber).subscribe(data=>
    {
      this.sentOtp=true;
      this.afterOtp=false;
     
    })
 
}
// function(){
//   if(this.otpgenerateform.value.emailid?.length!=0){
//     this.otpgenerateform.get('mobileNumber')?.disable();
//     setTimeout(() => {
//       // if(this.otpgenerateform.value.emailid?.valueOf==undefined &&this.otpgenerateform.value.emailid?.length== null){
//         this.otpgenerateform.get('mobileNumber')?.enable();
//       // }
//     }, 3000);
   
// }

// }
// function1(){

// }

get f(){
  return this.loginForm.controls;
}
get g(){
  return this.otpgenerateform.controls;
}
getFuntion(event:any){
console.log(event);

}

}
