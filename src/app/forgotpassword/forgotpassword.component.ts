import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FrontpageComponent } from '../frontpage/frontpage.component';
import { LoginComponent } from '../login/login.component';
import { RegisterserviceService } from '../services/registerservice.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  @ViewChild(LoginComponent)
  child!: LoginComponent;
  forgot:boolean=false;
 submitted:boolean=false;
 password:any;
 email:any;

  forgotpasswordform = new FormGroup({
    password:new FormControl('')
    ,newPassword: new FormControl('')

  });
  emailid: any;;

  constructor(private fb:FormBuilder,private registerService:RegisterserviceService,private route:ActivatedRoute) { }



  ngOnInit(): void {    
     
    this.forgotpasswordform = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],newPassword:['', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]]
  });
  }
  onSubmit(){
    this.submitted=true;

    //Breaks if form is invalid
    if(this.forgotpasswordform.invalid) {
      return;
    }
    if(this.forgotpasswordform.value.password!=this.forgotpasswordform.value.newPassword){
      this.forgot=true;
      setTimeout(() => {
        this.forgot=false;
      }, 3000);
    }
    else{
      this.email=this.route.snapshot.paramMap.get('email') || '{}'
  
    this.password=this.forgotpasswordform.value.password
    this.registerService.updatePassWord(this.email,this.password).subscribe(
      data=>{
          
      }
    )
    }
      
    

  }
get f(){
  return this.forgotpasswordform.controls;
}
}
