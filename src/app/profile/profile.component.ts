import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Register } from '../models/register';
import { ProfileserviceService } from '../services/profileservice.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {



 
 successMsg:boolean=false;

 register=new Register();
  profile = new FormGroup({
   empid:new FormControl(''),
   name:new FormControl(''),
   gender:new FormControl(''),
   dob:new FormControl(''),
   maritalstatus:new FormControl(''),
   mobilenumber:new FormControl(''),
   dateofjoining:new FormControl(''),
   department:new FormControl(''),
   designation:new FormControl(''),
   totalexperience:new FormControl(''),
   officelocation:new FormControl('')

  })

  constructor(private profileService:ProfileserviceService,private fb:FormBuilder) { }

  ngOnInit(): void {
 this.profileService.getRegisterDetails('5').subscribe(
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
      maritalstatus:new FormControl(value.maritalstatus),
      mobilenumber:new FormControl(value.mobilenumber),
      dateofjoining:new FormControl(value.dateofjoining),
      department:new FormControl(value.department),
      designation:new FormControl(value.designation),
      totalexperience:new FormControl(value.totalexperience),
      officelocation:new FormControl(value.officelocation)
    })
  }
  
  updateDetails(){
    this.profileService.updateRegisterDetails(this.register).subscribe(
      data => {
        this.successMsg=true;
        setTimeout(() => {
          this.successMsg=false;
        }, 3000);
        
      }
      
    )

  }

  }


