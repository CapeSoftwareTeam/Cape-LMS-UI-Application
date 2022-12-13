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
    newpassword: new FormControl(), fileName: new FormControl(''),
   
    fileSize: new FormControl(''),fileid:new FormControl(),fileType:new FormControl(),filename:new FormControl()
   
  });
  user = new User();

  errorMessage: any;
  showErrorMessage: boolean = false;
  fileName: String="";
  fileSize: any;
  file!: any;
  formFile:any;
  fileId:any;
  shortLink: string = "";
    loading: boolean = false; // Flag variable
contentSpinner: any;
  retreveFileId: any;
   

  constructor(private fb: FormBuilder, private registerService: RegisterserviceService, private route: Router, 
    private globalErrorHandler: GlobalErrorHandlerService,private fileUploadService:FileUploadService
  ) { }

  ngOnInit():void {
    this.empId = sessionStorage.getItem('empid')
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
      newpassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
      fileName:[''],
      fileSize:[''],fileid:[''],filename:[''],fileType:['']
    });

    this.fileUploadService.retriveFile(34).subscribe(data=>{
      // let temp=[];
      // temp=JSON.parse(data);
      // for(let i of temp){
        this.f.filename.setValue(JSON.parse(data).fileName);
        this.f.fileType.setValue(JSON.parse(data).fileType);
        this.f.fileid.setValue(JSON.parse(data).fileId);
        
      // }
      
      console.log(this.f.filename)
    })
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

  onChange(event:any){
    this.file = event.target.files;
    // if (this.file != null) {
    //   this.uploadDisable = false;
    // }
    this.changePasswordForm.controls.fileSize.setValue(Math.round(this.file[0].size / 1024) + " KB");
    this.fileSize = Math.round(this.file[0].size / 1024) + " KB";
    this.changePasswordForm.controls.fileSize = this.fileSize;
    this.fileName = this.file[0].name;
  }
  updateFile(){
    const formData: FormData = new FormData();
    for (let f of this.file) {
      formData.append('file', f, f.name);
    }
  this.fileId=30;
    this.formFile = formData;
    this.fileUploadService.updateFile(formData,this.fileId,this.fileSize).subscribe(data=>{
          this.ngOnInit();
    })
  }
  onUpload(){
    const formData: FormData = new FormData();
    for (let f of this.file) {
      formData.append('file', f, f.name);
    }
    
    this.formFile = formData;
            
   this.fileUploadService.fileUploadLms(formData,this.fileSize).subscribe(data=>{
    this.retreveFileId=data;
    this.fileId=parseInt(this.retreveFileId);
    this.f.fileid.setValue(this.fileId);
   this.retreveFileId(this.fileId)
    console.log(this.fileId);
    
    console.log("success")
   },
   error=>{
    this.showErrorMessage = true;
    this.errorMessage = this.globalErrorHandler.errorMessage;
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 3000);
   })
  }
  onDownload(){
         this.fileUploadService.fileDownload(32);
  }
}
