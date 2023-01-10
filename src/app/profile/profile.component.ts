import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Register } from '../models/register';
import { NgOtpInputConfig } from 'ng-otp-input';
import { ProfileserviceService } from '../services/profileservice.service';
import { ConfigurationOptions, CustomCountryModel, TooltipOptionsEnum } from 'intl-input-phone';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../models/user';
import { RegisterserviceService } from '../services/registerservice.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalErrorHandlerService } from '../services/global-error-handler.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // change number
  OtpNumber: boolean = false;
  optEnter: boolean = true;
  otpDisable: boolean = true;
  disableGenerate: boolean = true;
  disableSubmit: boolean = false;
  successMsgOtp: boolean = false;
  numberUpdateMsg: boolean = false;
  countryCode:any;
  //spinner: boolean = false;
 // blurMode: boolean = false;
  email: any;
  mobileNumber: any;
  showOtpComponent: boolean = false;
  Otp: any;
  changeNumberOtp = new Register();
  user = new User()
  modelReference: any;
  changeNumberSubmitted: boolean = false;
  failureMsgOtp: boolean = false;

  changeNumber: FormGroup;
  
  userEmail: any;
  otpsession: any;

// Profile
  disableBackBtn: boolean = true;
  cancelProfile: boolean = false;
  viewEmployee: boolean = false;
  disableEdit: boolean = true;
  submitted: boolean = false;
  flag: boolean = true;
  selectedCountryList: CustomCountryModel[] = [];
  successMsg: boolean = false;

  register = new Register();
  spinner: boolean = false;
  blurMode: boolean = false;
  empid: any;
  showErrorMessage: boolean = false;
  errorMessage: string='';
 
 

  constructor(private profileService: ProfileserviceService, private fb: FormBuilder,
    private route: Router,private registerService: RegisterserviceService,private modelService:NgbModal,private dialog:MatDialog,
    private globalErrorHandler: GlobalErrorHandlerService) {
      this.changeNumber = this.fb.group({
        mobileNumber: new FormControl('', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
      })
     }
  profile !: FormGroup;
  ngOnInit(): void {
   
    this.profile = new FormGroup({
      empid: new FormControl(''),
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      alternatenumber: new FormControl(''),
      emailid: new FormControl(''),
      maritalstatus: new FormControl('', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
      mobilenumber: new FormControl('', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
      dateofjoining: new FormControl(''),
      department: new FormControl(''),
      designation: new FormControl(''),
      totalexperience: new FormControl('', Validators.required),
      city: new FormControl(''),
      state: new FormControl(''),
      managername: new FormControl(''),
      manageremail: new FormControl('')

    });

    if (!this.viewEmployee) {
      this.empid = sessionStorage.getItem('empid')
    }
    this.profileService.getRegisterDetails(this.empid).subscribe(
      data => {
        this.register = JSON.parse(data);
       this.register.mobilenumber = this.register.mobilenumber.split('-')[1];
       this.register.alternatenumber = this.register.alternatenumber.split('-')[1];
        this.viewEmployee = false;
        // this.generateProfile(this.register);
      })
  }

  // // Form Controls
  // generateProfile(value: any) {
  //   let mobile=value.mobilenumber.split("-")[1]
  //   let altMobile=value.alternatenumber.split("-")[1]
  //   return this.fb.group({
  
  //     empid: new FormControl(value.empid),
  //     name: new FormControl(value.name),
  //     gender: new FormControl(value.gender),
  //     dob: new FormControl(value.dob),
  //     emailid: new FormControl(value.emailid),
  //     alternatenumber: new FormControl(altMobile),
  //     maritalstatus: new FormControl(value.maritalstatus),
  //     mobilenumber: new FormControl(mobile),
  //     dateofjoining: new FormControl(value.dateofjoining),
  //     department: new FormControl(value.department),
  //     designation: new FormControl(value.designation),
  //     totalexperience: new FormControl(value.totalexperience),
  //     city: new FormControl(value.city),
  //     state: new FormControl(value.state),
  //     managername: new FormControl(value.managername),
  //     manageremail: new FormControl(value.manageremail)
  //   })
  // }

  // Update Profile Details
  updateDetails() {
    this.submitted = true;
    if (this.profile.invalid) {
      return
    }
    this.countryCode='91';
    this.register.mobilenumber = '+'+ this.countryCode +'-' +this.profile.value.mobilenumber;
    this.register.alternatenumber = '+'+ this.countryCode +'-' +this.profile.value.alternatenumber;
    this.profileService.updateRegisterDetails(this.register).subscribe(
      data => {
        this.register.mobilenumber = this.register.mobilenumber.split('-')[1];
        this.register.alternatenumber = this.register.alternatenumber.split('-')[1];
        this.spinner = true;
        this.blurMode = true;
        setTimeout(() => {
          this.spinner = false;
          this.blurMode = false;
          this.successMsg = true;
          setTimeout(() => {
            this.successMsg = false;
          }, 3000);
        }, 2000);
      }, error=>{
        this.showErrorMessage=true;
        this.errorMessage=this.globalErrorHandler.errorMessage;
        setTimeout(() => {
          this.showErrorMessage=false;
        }, 3000);
  
      }
    )
  }

  // Get profile controls
  get field(): any {
    return this.profile.controls;
  }

  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  // change number Template Code starts here 

   // Validating OTP 
   submit() {
    this.changeNumberSubmitted = true;
    if (this.changeNumber.invalid) {
      return 
    }
    else if(this.Otp==null||this.Otp.length!=6||this.Otp==undefined){
      this.failureMsgOtp = true;
      // this.config.inputStyles={
      //   'color':'red',
      //   'font-size': 'initial',
      //   'box-shadow':' #f44336 0px 0px 15px'
      // }
     setTimeout(() => {
      this.failureMsgOtp=false;
  //     this.config.inputStyles ={
  //    'color':'#28a745',
  //    'font-size': 'initial',
  //    'width': '35px',
  //  'height': '45px',
   
  //  'background': 'rgba(255, 255, 255, 0.25)'
  //   }
  }, 3000);
 }
    this.user.email = this.userEmail;
    this.user.otp = this.Otp;
    this.user.otpSession = this.otpsession;
    this.registerService.verifyOtp(this.user).subscribe(data => {
      this.spinner = true;
      this.blurMode = true;
      setTimeout(() => {
        this.numberUpdateMsg = true;
        this.spinner = false;
        this.blurMode = false;
        setTimeout(() => {
          this.numberUpdateMsg = false;
          this.navigateToHome();
          this.updateMobileNumber();
          this.modelReference.close();
        }, 1000);
      }, 1000);
    }, error=>{
      this.showErrorMessage=true;
      this.errorMessage=this.globalErrorHandler.errorMessage;
      setTimeout(() => {
        this.showErrorMessage=false;
      }, 3000);

    })
    
  }

  // Updating in Table 
  updateMobileNumber(){  
    let mobileNumber: any;
    mobileNumber=this.changeNumber.value.mobileNumber
    this.profileService.updateMobileNumber(this.changeNumber.value.mobileNumber, sessionStorage.getItem("empid")).subscribe(data=>{
    
    }, error=>{
      this.showErrorMessage=true;
      this.errorMessage=this.globalErrorHandler.errorMessage;
      setTimeout(() => {
        this.showErrorMessage=false;
      }, 3000);

    })
  }


  navigateToHome(){
    this.route.navigate(['/home'])
  }


  openChangeNumberTemp(changeNumberTemp : any){
  this.modelReference = this.modelService.open(changeNumberTemp, {centered:true,
    size: 'm',
    backdrop:'static', 
    keyboard  : false})

  }

  // Cancel change number temp
  cancelTemp() {
    this.changeNumber.reset();
    this.modelReference.close();
  }

  // Cancel DialogBox
  cancelDialogBox() {
    this.dialog.closeAll();
  }

  // Generate OTP
  generate(form: any) {
    this.changeNumberSubmitted = true;
  
    if (this.changeNumber.invalid) {
      return
    }
    this.mobileNumber = this.changeNumber.value.mobileNumber;
    this.registerService.sendOtp(this.mobileNumber).subscribe(
      data => {
      this.userEmail = JSON.parse(data)[1];
      this.otpsession = JSON.parse(data)[0];
    }, error=>{
      this.showErrorMessage=true;
      this.errorMessage=this.globalErrorHandler.errorMessage;
      setTimeout(() => {
        this.showErrorMessage=false;
      }, 3000);

    })
    this.OtpNumber = true;
    this.optEnter = false;
    this.disableGenerate = false;
    this.disableSubmit = true;
    setTimeout(() => {
      this.successMsgOtp = true;
      this.showOtpComponent = true;
      setTimeout(() => {
        this.successMsgOtp = false;
      }, 2000);
    }, 3000);
  }

  config: NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: true,
    disableAutoFocus: false,
    placeholder: ''
  };

  // Getting OTP in Input Box
  onOtpChange(otp: any) {
    this.Otp = otp;
   
  }

  // Getting Form Controls
  get f(): any {
    return this.changeNumber.controls;
  }


}


