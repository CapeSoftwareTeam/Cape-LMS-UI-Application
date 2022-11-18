import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ProfileserviceService } from '../services/profileservice.service';
import { Register } from '../models/register';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-change-number',
  templateUrl: './change-number.component.html',
  styleUrls: ['./change-number.component.css']
})
export class ChangeNumberComponent implements OnInit {

  submitted:boolean = false;

  changeNumberOtp = new Register();

  changeNumber=new FormGroup({
   mobileNumber:new FormControl('',[Validators.required,Validators.min(1000000000), Validators.max(9999999999)]),
   otp:new FormControl('',Validators.required)

  })

  constructor(private profileService:ProfileserviceService,private route:Router,private dialogRef:MatDialogRef<ChangeNumberComponent>,
    ) { }

  ngOnInit(): void {
  }

  submit(){
    this.submitted = true;
    if (this.changeNumber.invalid) {
      return
    }
    // this.profileService.updateRegisterDetails(this.changeNumberOtp).subscribe(
    //   data => {
    //     console.log("success")
    //   },
    //   error => {
    //     console.log("bug")
    //   }
    // )
  
  }
  cancel(){
   this.dialogRef.close();
  }

  get field():any{
    return this.changeNumber.controls;
  }
  
}
