import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { ProfileserviceService } from '../services/profileservice.service';
import { Register } from '../models/register';

@Component({
  selector: 'app-change-number',
  templateUrl: './change-number.component.html',
  styleUrls: ['./change-number.component.css']
})
export class ChangeNumberComponent implements OnInit {

  submitted:boolean = false;

  changeNumberOtp = new Register();

  changeNumber=new FormGroup({
   mobileNumber:new FormControl(''),
   otp:new FormControl('')

  })

  constructor(private profileService:ProfileserviceService ) { }

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

  get field():any{
    return this.changeNumber.controls;
  }
  
}
