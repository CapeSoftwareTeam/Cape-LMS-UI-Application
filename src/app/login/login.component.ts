import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  modalReference: any;
  submitted:boolean=false;
  submit:boolean=false;
  loginForm=new FormGroup({
    empid:new FormControl(''),
    password:new FormControl('')
   
  })
  otpgenerateform=new FormGroup({ mobileNumber:new FormControl(''),
  otp:new FormControl('')})
  constructor(private modalService: NgbModal ,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.loginForm=this.formbuilder.group({
      empid:['',[Validators.required]],
      password:['',[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.required]]
      

  });
  this.otpgenerateform=this.formbuilder.group({
    mobileNumber: ['',[Validators.maxLength(10),Validators.minLength(10),Validators.required]],
      otp:['',Validators.required]
  })
  }
  otpValidation(otpGenerate:any){
    this.modalReference = this.modalService.open(otpGenerate)
  }
  onCancel() {
    this.modalReference.close();
  }
login(){
  this.submitted=true;

  
  if(this.loginForm.invalid) {
    return;
  }
}
submitForm(){
  this.submit=true;

  
  if(this.otpgenerateform.invalid) {
    return;
  }
}
generate(){
  this.submit=true;

 
  if(this.otpgenerateform.invalid) {
    return;
  }
}
get f(){
  return this.loginForm.controls;
}
get g(){
  return this.otpgenerateform.controls;
}

}
