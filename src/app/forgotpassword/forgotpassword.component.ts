import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

 submitted:boolean=false;

  forgotpasswordform = new FormGroup({
    password:new FormControl('')
    ,newPassword: new FormControl('')

  });

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {       
    this.forgotpasswordform = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.pattern("((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})")]],newPassword:['', [
          Validators.required,
          Validators.pattern("^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})")]]
  });
  }
  onSubmit(){
    this.submitted=true;

    //Breaks if form is invalid
    if(this.forgotpasswordform.invalid) {
      return;
    }

  }
get f(){
  return this.forgotpasswordform.controls;
}
}
