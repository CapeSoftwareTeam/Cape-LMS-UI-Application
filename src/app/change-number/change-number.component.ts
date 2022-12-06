import { Component, Inject, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ProfileserviceService } from '../services/profileservice.service';
import { Register } from '../models/register';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterserviceService } from '../services/registerservice.service';
import { from } from 'rxjs';
import { NgOtpInputConfig } from 'ng-otp-input';
import { User } from '../models/user';


@Component({
  selector: 'app-change-number',
  templateUrl: './change-number.component.html',
  styleUrls: ['./change-number.component.css']
})
export class ChangeNumberComponent implements OnInit {

  OtpNumber: boolean = false;
  optEnter: boolean = true;
  successMsgg: boolean = false;
  otpDisable: boolean = true;
  disableGenerate: boolean = false;
  disableSubmit: boolean = true;
  successMsg: boolean = false;
  spinner: boolean = false;
  submitted: boolean = false;
  blurMode: boolean = false;
  email: any;
  mobileNumber: any;
  showOtpComponent: boolean = false;
  Otp: any;
  changeNumberOtp = new Register();
  user = new User()


  changeNumber = this.formBuilder.group({
    mobileNumber: new FormControl('', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
    otp: new FormControl('', [Validators.required, Validators.min(100000), Validators.max(999999)]),
  })
  userEmail: any;
  otpsession: any;


  constructor(private profileService: ProfileserviceService, private route: Router, private formBuilder: FormBuilder,
    private registerService: RegisterserviceService, private dialog: MatDialog, private dialogRef: MatDialogRef<ChangeNumberComponent>
  ) { }

  ngOnInit(): void {


  }

  // Validating OTP 
  submit() {
    this.submitted = true;
    this.changeNumber.controls.otp.setValidators([Validators.required, Validators.min(100000), Validators.max(999999)]);
    this.changeNumber.controls.otp.updateValueAndValidity();
    if (this.changeNumber.invalid) {
      return
    }
    this.user.email = this.userEmail;
    this.user.otp = this.Otp;
    this.user.otpSession = this.otpsession;
    this.registerService.verifyOtp(this.user).subscribe(data => {

    })
    this.spinner = true;
    this.blurMode = true;

    setTimeout(() => {
      this.successMsgg = true;
      this.spinner = false;
      this.blurMode = false;
      setTimeout(() => {
        this.successMsgg = false;
        this.navigateToHome();
        this.updateMobileNumber();
        this.dialogRef.close();
      }, 1000);
    }, 1000);
    
  }

  // Updating in Table 
  updateMobileNumber(){  
    let mobileNumber: any;
    mobileNumber=this.changeNumber.value.mobileNumber
    this.profileService.updateMobileNumber(this.changeNumber.value.mobileNumber, sessionStorage.getItem("empid")).subscribe(data=>{
      
    })
  }


  navigateToHome(){
    this.route.navigate(['/home'])
  }


  // Cancel Dialog Box
  cancel() {
    this.dialogRef.close();
  }

  // Generate OTP
  generate(form: any) {
    debugger
    form.otp.clearValidators();
    form.otp.updateValueAndValidity();
    debugger
    this.submitted = true;
    if (this.changeNumber.invalid) {
      return
    }
    this.mobileNumber = this.changeNumber.value.mobileNumber;
    this.registerService.sendOtp(this.mobileNumber).subscribe(data => {
      this.userEmail = JSON.parse(data)[1];
      this.otpsession = JSON.parse(data)[0];
    })
    this.OtpNumber = true;
    this.optEnter = false;
    this.disableGenerate = true;
    this.disableSubmit = false;
    setTimeout(() => {
      this.successMsg = true;
      this.showOtpComponent = true;
      setTimeout(() => {
        this.successMsg = false;
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
    this.changeNumber.controls.otp.setValue(this.Otp);
  }

  // Getting Form Controls
  get field(): any {
    return this.changeNumber.controls;
  }

}
