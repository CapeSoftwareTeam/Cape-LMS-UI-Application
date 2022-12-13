import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { GlobalErrorHandlerService } from '../global-error-handler.service';
import { User } from '../models/user';
import { FileUploadService } from '../services/file-upload.service';
import { RegisterserviceService } from '../services/registerservice.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  empId: any;
  submitted: boolean = false;
  succesMsg: boolean = false;
  changePasswordForm = new FormGroup({
    oldPassword: new FormControl(),
    newpassword: new FormControl(), 
  
  });
  user = new User();

  errorMessage: any;
  showErrorMessage: boolean = false;
  constructor(private fb: FormBuilder, private registerService: RegisterserviceService, private route: Router, 
    private globalErrorHandler: GlobalErrorHandlerService,private fileUploadService:FileUploadService
  ) { }

  ngOnInit():void {
    this.empId = sessionStorage.getItem('empid')
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
      newpassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
     
    });

   
  }
 

  submit() {
    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }
    this.user.oldPassword = this.changePasswordForm.value.oldPassword;
    this.user.password = this.changePasswordForm.value.newpassword;
    this.user.empId = this.empId;
    this.registerService.changePassword(this.user).subscribe(data => {
      this.succesMsg = true;
      setTimeout(() => {
        this.succesMsg = false;
        this.route.navigate(['/home']);
      }, 3000);

    },
      error => {
        this.showErrorMessage = true;
        this.errorMessage = this.globalErrorHandler.errorMessage;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000);
      }
    )

  }
  back() {
    this.route.navigate(['/home'])
  }
  get f() {
    return this.changePasswordForm.controls;
  }

  
}
