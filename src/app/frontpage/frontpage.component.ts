import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
date:any;
router:any;
modalReference:any;
  errorMsg: boolean=false;
  signUpBtn:boolean=true;

  constructor(private route:Router,private dialoge:MatDialog,private modelService:NgbModal) { }

  ngOnInit(): void {
    this.date = new Date().getFullYear()
  }
  // modal box open for Login
  loginPage(){
    const dialogRef=this.dialoge.open(LoginComponent,{
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(data=>{
      
    })

  }
  // template Open For SignUp
  signUp(signup:any){
this.modalReference=this.modelService.open(signup,{size:'m'})
  }
  // signUp Click Fuction
  signupButton(){
    this.onCancel();
    const dialogRef=this.dialoge.open(RegisterComponent,{
      disableClose: true
     })
     dialogRef.afterClosed().subscribe(data=>{

     })

  }
  // onFocus Event For SignUp
  userInput(event:any){
     if(event.target.value=='gk@capeindia.net'|| event.target.value=='srp@capeindia.net'||
     event.target.value=='asha@capeindia.net'||event.target.value=='vasanthi@capeindia.net'){
      this.signUpBtn=false;
      
     }
     else{
      this.errorMsg=true;
    setTimeout(() => {
      this.errorMsg=false;
      return;
    }, 3000);
      
     }
  }
  // modal box close
onCancel(){
  this.modalReference.close();
}

}
