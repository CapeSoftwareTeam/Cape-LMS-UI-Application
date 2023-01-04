import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { GlobalErrorHandlerService } from '../services/global-error-handler.service';
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

  // changePasswordForm FormGroup
  changePasswordForm = new FormGroup({
    oldPassword: new FormControl(),
    newpassword: new FormControl(), 
  
  });
  user = new User();
  errorMessage: any;
  showErrorMessage: boolean = false;
  constructor(private fb: FormBuilder, private registerService: RegisterserviceService, private route: Router, 
    private globalErrorHandler: GlobalErrorHandlerService,private fileUploadService:FileUploadService,private dialogRef: MatDialogRef<ChangePasswordComponent>
  ) { }

  ngOnInit():void {
    // empId get in Session Storage 
    this.empId = sessionStorage.getItem('empid')
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newpassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
     
    });
  }
//  Submit Method
  submit() {
    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }
    this.user.oldPassword = this.changePasswordForm.value.oldPassword;
    this.user.password = this.changePasswordForm.value.newpassword;
    this.user.empId = this.empId;
    // change Password service
    this.registerService.changePassword(this.user).subscribe(data => {
      this.succesMsg = true;
      setTimeout(() => {
        this.succesMsg = false;
        this.dialogRef.close();
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
  //Back Button Method
  back() {
    this.dialogRef.close();
  }
  // get Controls
  get f() {
    return this.changePasswordForm.controls;
  }

  
}
