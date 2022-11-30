import { Component, OnInit ,ViewChild, ViewChildren,ElementRef, Input} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationOptions, CustomCountryModel, TooltipOptionsEnum } from 'intl-input-phone';
import { RegisterserviceService } from '../services/registerservice.service';
import { User } from '../models/user';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { exclamationSquareFill } from 'ngx-bootstrap-icons';
import { TokenServiceService } from '../services/token-service.service';
import { GlobalErrorHandlerService } from '../global-error-handler.service';



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
  errorMessage:String='';
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

  flag: boolean=false;
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
  otpErrorMsg: boolean=false;
  otperrorMsg: any;
  // @ViewChild(TokenServiceService) tokenServiceService: any;

  // ngAfterViewInit() {
  //    console.log("its messsege read")
  // this.errorMessage= this.tokenServiceService.errorMessage;
  //   console.log(this.errorMessage)
  // }
  // @Input()
  // TokenServiceService!: string;
  
 
  constructor(private modalService: NgbModal ,
              private formbuilder:FormBuilder,
              private registerService:RegisterserviceService,
              private router:Router,
              private tokenService:TokenServiceService,
              private globalErrorHandler: GlobalErrorHandlerService) { 
      this.configOption1 = new ConfigurationOptions();
      this.configOption1.SelectorClass = "ToolTipType1"; 
   
    }
    Otp!: string;
  showOtpComponent = false;
 
  config :NgOtpInputConfig = {
    allowNumbersOnly: true,
    length:6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',  
    inputClass:'each_input',
    containerClass:'all_inputs'
  
  };
  onOtpChange(otp: any) {
    this.Otp = otp;
    
  }
  validate(event:any){
    
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
      this.loginForm.controls.mobileNumberLogin.setValidators([Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.required]);

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

validateOtp(event:any){
if(event.value=="mobileNumber"){
   this.otpgenerateform.controls.emailid.setValue('');
  this.otpgenerateform.controls.emailid.clearValidators();
  this.otpgenerateform.controls.emailid.updateValueAndValidity();
  this.otpgenerateform.controls.otp.clearValidators();
  this.otpgenerateform.controls.otp.updateValueAndValidity();
  
  this.otpgenerateform.controls.mobileNumber.setValidators([Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
}
else{
  this.otpgenerateform.controls.mobileNumber.setValue('');
  this.otpgenerateform.controls.mobileNumber.clearValidators()
  this.otpgenerateform.controls.mobileNumber.updateValueAndValidity()
  this.otpgenerateform.controls.otp.clearValidators();
  this.otpgenerateform.controls.otp.updateValueAndValidity();
  this.otpgenerateform.controls.emailid.setValidators([Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}")])
}
}
  otpValidation(){
    this.disable1 = true;
    this.otp=true;
    this.loginPage=false;
    this.showErrorMessage=false;

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
  
login(flag:any){
 
  this.submitted=true;

  
    // this.user.emailid
  // this.user.emailid = this.loginForm.value.emailidLogin;

  if(this.loginForm.invalid) {
    return;
  }
  if(this.loginForm.value.emailidLogin?.length==0 ||this.loginForm.value.empid?.length==0 ||this.loginForm.value.mobileNumberLogin?.length==0){
    this.submitted=true;
  }
  
  // if(flag){
    this.registerService.authenticate( this.user).subscribe(data=>{ 
      this.isLogin = true;
      sessionStorage.setItem('empid',JSON.parse(data).register.empid);
      
      sessionStorage.setItem('token',JSON.parse(data).token);
       sessionStorage.setItem('token',JSON.parse(data).token);
      
      this.router.navigate(['/home',{email:JSON.parse(data).register.emailid}]);
    },
    error=>{
      this.showErrorMessage=true;
      this.errorMessage=this.globalErrorHandler.errorMessage;
      setTimeout(() => {
        this.showErrorMessage=false;
      }, 3000);
    }
    )
  // }
  // else{
  //   if(this.globalErrorHandler.errorMessage==""){
  //     this.showErrorMessage=true;
  //     this.errorMessage=this.globalErrorHandler.errorMessage;
  //     setTimeout(() => {
  //       this.showErrorMessage=false;
  //       this.errorMessage="";
  //     }, 3000);
  //   }
  // }
 
    
    // error=>{
    //   this.showErrorMessage = true;
      
    //   this.errorMessage = JSON.parse(error.error).message;
    //      setTimeout(() => {
    //       this.showErrorMessage=false;
    //      }, 3000);
    // }

  

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
  },
  error=>{
    if(this.errorOtp==true){
      this.showErrorMessage=false;
    }
    else{
      this.showErrorMessage=true;
      this.errorMessage=this.globalErrorHandler.errorMessage;
      setTimeout(() => {
        this.showErrorMessage=false;
      }, 3000);
    }
  } )
  
}
generate():any{
  
  this.submit=true;
  
  if(this.otpgenerateform.invalid) {
    return;
  }
 
 
  if(this.otpgenerateform.value.emailid?.length==0 && this.otpgenerateform.value.mobileNumber?.length==0 ||this.otpgenerateform.value.emailid?.valueOf==undefined
    ||this.otpgenerateform.value.mobileNumber?.valueOf==undefined ){
    this.errorMsg=true;
    this.showErrorMessage=false;
    setTimeout(() => {
      this.errorMsg=false;
    }, 3000);
     
  }
  
  this.email=this.otpgenerateform.value.emailid;
 
  this.mobileNumber= this.otpgenerateform.value.mobileNumber
  if(this.otpgenerateform.value.otpgenerate=="mobileNumber"){
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
     
    },error=>{
      if(this.errorMsg==true){
        this.showErrorMessage=false;
      }
      else{
        this.showErrorMessage=true;
        this.errorMessage=this.globalErrorHandler.errorMessage;
        setTimeout(() => {
          this.showErrorMessage=false;
        }, 3000);
      }
     
    }
    )
    
   
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
