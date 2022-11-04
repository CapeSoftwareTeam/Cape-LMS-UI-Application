import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
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
  errorMsg: boolean=false;
  showErrorMessage=false;
  sentOtp:boolean = false;
  disable:boolean=true;
  loginForm=new FormGroup({
    empid:new FormControl(''),
    password:new FormControl('')

  })
  otpgenerateform=new FormGroup({ mobileNumber:new FormControl(''),
  otp:new FormControl(''),emailid:new FormControl('')})
  constructor(private modalService: NgbModal ,
    private formbuilder:FormBuilder,private route:Router) { }

  ngOnInit(): void {
    this.loginForm=this.formbuilder.group({
      empid:['',[Validators.required]],
      password:['',[Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),Validators.required]]
      

  });
  this.otpgenerateform=this.formbuilder.group({
    mobileNumber: ['',[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      otp:['',Validators.required],emailid:['',Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}")]
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
this.route.navigate(['/home']);
}
submitForm(){
  this.submit=true;


  if(this.otpgenerateform.invalid) {
    return;
  }
}
generate(){
  
  this.submit=true;
  

 
 
  if(this.otpgenerateform.value.emailid?.length==0 && this.otpgenerateform.value.mobileNumber?.length==0 ||this.otpgenerateform.value.emailid?.valueOf==undefined
    ||this.otpgenerateform.value.mobileNumber?.valueOf==undefined ){
    this.errorMsg=true;
    setTimeout(() => {
      this.errorMsg=false;
    }, 3000);
     
  }
 
}
// function(){
//   if(this.otpgenerateform.value.emailid?.length!=0){
//     this.otpgenerateform.get('mobileNumber')?.disable();
//     setTimeout(() => {
//       // if(this.otpgenerateform.value.emailid?.valueOf==undefined &&this.otpgenerateform.value.emailid?.length== null){
//         this.otpgenerateform.get('mobileNumber')?.enable();
//       // }
//     }, 3000);
   
// }

// }
// function1(){

// }

get f(){
  return this.loginForm.controls;
}
get g(){
  return this.otpgenerateform.controls;
}

}
