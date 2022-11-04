import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  submitted:boolean=false;
  changePasswordForm=new FormGroup({
    newpassword:new FormControl('')
  });
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
        this.changePasswordForm= this.fb.group({
            newpassword:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]]
        });
  }
  submit(){
    this.submitted=true;
    if(this.changePasswordForm.invalid) {
      return;
    }
  }
  get f(){
    return this.changePasswordForm.controls;
  }

}
