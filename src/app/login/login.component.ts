import { Component, OnInit ,ViewChild, ViewChildren,ElementRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationOptions, CustomCountryModel, TooltipOptionsEnum } from 'intl-input-phone';
import { RegisterserviceService } from '../services/registerservice.service';
import { User } from '../models/user';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { exclamationSquareFill } from 'ngx-bootstrap-icons';



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
  showErrorMessage: boolean=false;
  dhana:boolean=true;
  errorMessage:string='';
  sentOtp:boolean = false;
  disable:boolean=true;
  configOption1: ConfigurationOptions;
  selectedCountryList : CustomCountryModel[] = [];
  public token: string = '';
  isLogin:boolean=false;
  email:any;
  mobileNumber:any;
  afterOtp:boolean=true;
 
  countryCode:string='';
  user=new User();


  loginForm=new FormGroup({
  empid:new FormControl(''),
  password:new FormControl(''),userValidation:new FormControl(''),emailidLogin:new FormControl(''),mobileNumberLogin:new FormControl('')

  })
  errorOtp:boolean=false;
  otp: boolean=false;
  loginPage:boolean=true;
  userName: any;
  Email: any;
  otpsession: any;
  disableMOb:boolean=false;
  successMsgOtp:boolean=false;


  otpgenerateform=new FormGroup({ otpgenerate:new FormControl(''),mobileNumber:new FormControl('')
  ,emailid:new FormControl(''), otp :new FormControl('')})
  
  constructor(private modalService: NgbModal ,
    private formbuilder:FormBuilder,private registerService:RegisterserviceService,private router:Router) { 
      this.configOption1 = new ConfigurationOptions();
      this.configOption1.SelectorClass = "ToolTipType1"; 
   
    }
    Otp!: string;
  showOtpComponent = false;
 
  config :NgOtpInputConfig = {
    allowNumbersOnly: true,
    length:6,
    isPasswordInput: true,
    disableAutoFocus: false,
    placeholder: ''
  };
  onOtpChange(otp: any) {
    this.Otp = otp;
    
  }
  validate(event:any){
    debugger
    if(event.value == "empid"){
      this.loginForm.controls.emailidLogin.clearValidators();
      this.loginForm.controls.emailidLogin.updateValueAndValidity();
      this.loginForm.controls.mobileNumberLogin.clearValidators();
      this.loginForm.controls.mobileNumberLogin.updateValueAndValidity();
      this.loginForm.controls.empid.setValidators([Validators.required]);

    }else if(event.value == "mobileNumber"){
      this.loginForm.controls.empid.clearValidators();
      this.loginForm.controls.empid.updateValueAndValidity();
      this.loginForm.controls.emailidLogin.clearValidators();
      this.loginForm.controls.emailidLogin.updateValueAndValidity();
      this.loginForm.controls.mobileNumberLogin.setValidators([Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}"),Validators.required]);

    }
    else{
      this.loginForm.controls.mobileNumberLogin.clearValidators();
      this.loginForm.controls.mobileNumberLogin.updateValueAndValidity();
      this.loginForm.controls.empid.clearValidators();
      this.loginForm.controls.empid.updateValueAndValidity();
      this.loginForm.controls.emailidLogin.setValidators([Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}"),Validators.required]);
    }    
  }
 
  ngOnInit(): void {
    


    this.loginForm=this.formbuilder.group({
      userValidation:['',[Validators.required]],
      empid:['',[Validators.required]],
    
      mobileNumberLogin: ['',[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.required]],
      emailidLogin:['',[Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}"),Validators.required]],
      password:['',[Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),Validators.required]]
  });
  this.otpgenerateform=this.formbuilder.group({otpgenerate:['',Validators.required],
    mobileNumber: ['',[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    ,emailid:['',Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}")],otp:['',Validators.required],
   
     
  });

  
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
  
login(){
 
  this.submitted=true;

  
    // this.user.emailid
  // this.user.emailid = this.loginForm.value.emailidLogin;

  if(this.loginForm.invalid) {
    return;
  }
  if(this.loginForm.value.emailidLogin?.length==0 ||this.loginForm.value.empid?.length==0 ||this.loginForm.value.mobileNumberLogin?.length==0){
    this.submitted=true;
  }
  
  
 
    this.registerService.authenticate( this.user).subscribe(data=>{
    
      
      this.isLogin = true;
      sessionStorage.setItem('empid',JSON.parse(data).register.empid);
      
      sessionStorage.setItem('token',JSON.parse(data).token);
       sessionStorage.setItem('token',JSON.parse(data).token);
      
      this.router.navigate(['/home',{email:JSON.parse(data).register.emailid}]);
      
     
    },error=>{
      this.showErrorMessage = true;
      this.errorMessage = JSON.parse(error.error).message;
         
    }
    
      
     
    )
   

  

}
submitForm(){
  // this.submit=true;


  // if(this.otpgenerateform.invalid) {
  //   return;
  // }
  if(this.Otp==null || this.Otp.length!=6){
    this.errorOtp=true;
    setTimeout(() => {
      this.errorOtp=false;
    }, 3000);
  }

  this.user.email=this.Email;
  this.user.otp=this.Otp;
  this.user.otpSession=this.otpsession;
  this.registerService.verifyOtp(this.user).subscribe((data: any)=>{
    this.router.navigate(['/forgotpassword',{email:this.Email}]);
  }, )
  
}
generate():any{
  
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
  if(this.mobileNumber!=null &&this.mobileNumber!=undefined){
    this.userName=this.mobileNumber;
  }
  else{
    this.userName=this.email;
  }


  this.registerService.sendOtp(this.userName).subscribe((data: string)=>
    {
      this.Email=JSON.parse(data)[0];
      this.otpsession=JSON.parse(data)[1];
      
   
      this.successMsgOtp = true;
      setTimeout(() => {
        this.disableMOb=true;
        this.showOtpComponent=true;
        this.afterOtp=false;
        this.successMsgOtp = false;
      }, 3000);
      

      return this.Email;
     
    })
    
   
}


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
