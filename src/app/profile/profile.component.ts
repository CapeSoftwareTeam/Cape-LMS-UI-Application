import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Register } from '../models/register';
import { ProfileserviceService } from '../services/profileservice.service';
import { ConfigurationOptions, CustomCountryModel, TooltipOptionsEnum } from 'intl-input-phone';
import { ChangeNumberComponent } from '../change-number/change-number.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  submitted: boolean = false;
  flag: boolean = true;
  selectedCountryList : CustomCountryModel[] = [];
 successMsg:boolean=false;

 register=new Register();
 spinner: boolean=false;
 blurMode: boolean=false;
empid:any;

  constructor(private profileService:ProfileserviceService,private fb:FormBuilder,
    private route:Router,private dialog:MatDialog) { }
  profile !:FormGroup;
  ngOnInit(): void {

   this.profile = new FormGroup({
      empid:new FormControl(''),
      name:new FormControl('',Validators.required),
      gender:new FormControl('',Validators.required),
      dob:new FormControl('',Validators.required),
      alternatenumber:new FormControl(''),
      emailid:new FormControl(''),
      maritalstatus:new FormControl('',[Validators.required,Validators.min(1000000000), Validators.max(9999999999)]),
      mobilenumber:new FormControl('',[Validators.required,Validators.min(1000000000), Validators.max(9999999999)]),
      dateofjoining:new FormControl(''),
      department:new FormControl(''),
      designation:new FormControl(''),
      totalexperience:new FormControl('',Validators.required),
      city:new FormControl(''),
      state:new FormControl(''),
      managername:new FormControl(''),
      manageremail:new FormControl('')
   
     });
     
     this.empid=sessionStorage.getItem('empid')
 this.profileService.getRegisterDetails(this.empid).subscribe(
  data=>{
       this.register=JSON.parse(data);
       this.generateProfile(this.register);
  })
  console.log(this.generateProfile);
  }
  generateProfile(value: any) {
    return this.fb.group({
      empid:new FormControl(value.empid),
      name:new FormControl(value.name),
      gender:new FormControl(value.gender),
      dob:new FormControl(value.dob),
      emailid:new FormControl(value.emailid),
      alternatenumber:new FormControl(value.alternatenumber),
      maritalstatus:new FormControl(value.maritalstatus),
      mobilenumber:new FormControl(value.mobilenumber),
      dateofjoining:new FormControl(value.dateofjoining),
      department:new FormControl(value.department),
      designation:new FormControl(value.designation),
      totalexperience:new FormControl(value.totalexperience),
      city:new FormControl(value.city),
      state:new FormControl(value.state),
      managername:new FormControl(value.managername),
      manageremail:new FormControl(value.manageremail)
    })
  }

  updateDetails(){
    this.submitted = true;
    if (this.profile.invalid) {
      return
    }
    this.profileService.updateRegisterDetails(this.register).subscribe(
      data => {
        this.spinner=true;
      //  this.successMsg=true;
        this.blurMode=true;
        setTimeout(() => {
          this.spinner=false;
          this.blurMode=false;
          this.successMsg=true;
          setTimeout(() => {
            this.successMsg =false;
          }, 3000);
        }, 2000);
      }
 
    )
  }


  otp():void{
   const dialogRef= this.dialog.open(ChangeNumberComponent,
      {
      // width: '450px',
      // height: '300px',
      disableClose: true,

});
dialogRef.afterClosed().subscribe(data=>{
  console.log("its closed")
})
  }

  profileCancel(){
    this.route.navigate(['/home', ]);
  }

get field():any{
  return this.profile.controls;
}
keyPressNumbers(event: any) {
  var charCode = (event.which) ? event.which : event.keyCode;
  // Only Numbers 0-9
  if ((charCode < 48 || charCode > 57)) {
    event.preventDefault();
    return false;
  } else {
    return true;
  }
}


submitFunction() {
  //validation trigger
  this.submitted = true;
  if (this.profile.invalid) {
    return
  }
  this.profileService.updateRegisterDetails(this.register).subscribe(
    data => {
      console.log("success")
    },
    error => {
      console.log("bug")
    }
  )

}
  
  }


