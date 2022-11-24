import { Component, Inject, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ProfileserviceService } from '../services/profileservice.service';
import { Register } from '../models/register';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterserviceService } from '../services/registerservice.service';
import { from } from 'rxjs';


@Component({
  selector: 'app-change-number',
  templateUrl: './change-number.component.html',
  styleUrls: ['./change-number.component.css']
})
export class ChangeNumberComponent implements OnInit {

  OtpNumber:boolean = false;
  optEnter:boolean = true;
  successMsgg:boolean = false;
  otpDisable:boolean = true;
  disableGenerate:boolean = false;
  disableSubmit:boolean = true;
  successMsg:boolean=false;
  spinner:boolean =false;
  submitted:boolean = false;
  blurMode:boolean = false;

  changeNumberOtp = new Register();
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;

  changeNumber= this.formBuilder.group({
   mobileNumber:new FormControl('',[Validators.required,Validators.min(1000000000), Validators.max(9999999999)]),
   otp:new FormControl('',[Validators.required,Validators.min(100000),Validators.max(999999)]),
   input1:[''],
   input2:[''],
   input3:[''],
   input4:[''],
   input5:[''],
   input6:['']

  })
  email: any;
  mobileNumber:any;

  constructor(private profileService:ProfileserviceService,private route:Router, private formBuilder: FormBuilder,
    private dialogRef:MatDialogRef<ChangeNumberComponent>,private registerService:RegisterserviceService
    ) { }

  ngOnInit(): void {
   // sessionStorage.setItem('email','gokul@gmail.com')

  }

  submit(form:any){
    this.submitted = true;
    form.otp.setValidators([Validators.required]);
    form.otp.updateValueAndValidity();
    if (this.changeNumber.invalid) {
      return
    }
             this.spinner = true;
             this.blurMode = true;

                setTimeout(() => {
                   this.successMsgg = true;
                   this.spinner = false;
                   this.blurMode = false;
                   setTimeout(() => {
                    this.successMsgg = false;
                    this.dialogRef.close();
                   }, 1000);
                     },3000);
                    }
  
  cancel(){
   this.dialogRef.close();
  }
  generate(form:any){
    debugger
    form.otp.clearValidators();
    form.otp.updateValueAndValidity();
    debugger
    this.submitted = true;
    if (this.changeNumber.invalid) {
      return
    }
   
    
    this.mobileNumber=this.changeNumber.value.mobileNumber;
    this.email=sessionStorage.getItem('email')
   this. registerService.sendOtp(this.email,this.mobileNumber).subscribe(data=>{
   
   })
   this.OtpNumber = true;
   this.optEnter = false;
    this.disableGenerate= true;
    this.disableSubmit = false;
    setTimeout(() => {
      this.successMsg = true;
    setTimeout(() => {
      this.successMsg = false;
    },2000);
    }, 3000);
  }
    // form.mobileNumber.setValidators();
    // form.mobileNumber.updateValueAndValidity();
       

                                         
    // if(this.submitted = true){
    //   if (this.changeNumber.invalid) {
    //   }
    // }else{
    //    // this.successMsg=true;
    //   //  this.spinner = true;
    //   //  this.blurMode= true;
    //   //  this.disableGenerate= true;
    //   //       setTimeout(() => {
    //   //          this.spinner = false;
    //   //          this.blurMode = false;
    //   //          this.successMsg = true;
    //   //               setTimeout(() => {
    //   //                     this.successMsg = false;
    //   //                          }, 2000);
    //   //                     },3000);
    //                    }
  
    keyUpEvent(event:any, index:any) {
      let pos = index;
      if (event.keyCode === 8 && event.which === 8) {
        pos = index - 1 ;
      } else {
        pos = index + 1 ;
      }
      if (pos > -1 && pos < this.formInput.length ) {
        this.rows._results[pos].nativeElement.focus();
      }
    }
  
  
  get field():any{
    return this.changeNumber.controls;
  }
  
}
