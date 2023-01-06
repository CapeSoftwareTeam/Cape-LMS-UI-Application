import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalErrorHandlerService } from '../services/global-error-handler.service';
import { User } from '../models/user';

import { RegisterserviceService } from '../services/registerservice.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  forgot: boolean = false;
  submitted: boolean = false;
  successMsgPasword: boolean = false;

  // forgotpasswordform formGroup
  forgotpasswordform = new FormGroup({
    password: new FormControl()
    , newPassword: new FormControl()

  });

  user = new User();
  showErrorMessage: boolean = false;
  errorMessage: string = '';
  constructor(private fb: FormBuilder, private registerService: RegisterserviceService, private route: ActivatedRoute,
    private dialogRef:MatDialogRef<ForgotpasswordComponent>  , private router: Router,private globalErrorHandler:GlobalErrorHandlerService
  ) { }




  ngOnInit(): void {
    console.log(this.globalErrorHandler.email)
    // console.log(this.dialogRef.afterOpened());
    this.forgotpasswordform = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]], newPassword: ['', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]]
    });
  }
  
  // Submit Method
  onSubmit() {
    this.submitted = true;

    //Breaks if form is invalid
    if (this.forgotpasswordform.invalid) {
      return;
    }

    // password match validation
    if (this.forgotpasswordform.value.password != this.forgotpasswordform.value.newPassword) {
      this.forgot = true;
      setTimeout(() => {
        this.forgot = false;
      }, 3000);
      return
    }


    this.user.password = this.forgotpasswordform.value.password;;
    this.user.email = this.globalErrorHandler.email;
    //upadate password
    this.registerService.updatePassWord(this.user).subscribe((data: string) => {

      this.successMsgPasword = true;
      setTimeout(() => {
        this.successMsgPasword = false;
        this.dialogRef.close();
      }, 3000);


    }, error => {


    }
    )
  }

  //Back button Condition
  back() {
   this.dialogRef.close();
  }
  //get controls
  get f() {
    return this.forgotpasswordform.controls;
  }
}
