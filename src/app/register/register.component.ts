import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Register } from '../models/register';
import { RegisterserviceService } from '../services/registerservice.service';
// import { Router } from '@angular/router';
// import { ServiceService } from 'src/app/service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted:boolean=false;
  register = new Register();
  RegisterationForm= new FormGroup({
  empid : new FormControl(''),
  name : new FormControl(''),
  gender : new FormControl(''),
  dob : new FormControl(''),
  maritalStatus : new FormControl(''),
  mobile : new FormControl(''),
  alternate : new FormControl(''),
  email : new FormControl(''),
  doj : new FormControl(''),
  department : new FormControl(''),
  designation : new FormControl(''),
  totalExperience : new FormControl(''),
  officeLocation : new FormControl(''),
  // createdDate : new FormControl(''),
  // createdBy : new FormControl(''),
  // updatedDate :new FormControl (''),
  // updatedBy : new FormControl (''),
  password : new FormControl(''),
  OtherExperience : new FormControl(''),
  capeExperience : new FormControl(''),
  })
  


  constructor(private formBuilder: FormBuilder,
    private registerService: RegisterserviceService

    ) { }

  ngOnInit(): void {
    this.RegisterationForm = this.formBuilder.group({
      empid : ['', [Validators.required,]],
      name:['', [Validators.required,]],
      gender:['', [Validators.required,]],
      dob :['', [Validators.required,]],
      maritalStatus:['', [Validators.required,]],
      mobile:['', [Validators.required,]],
      alternate:['', [Validators.required,]],
      email:['', [Validators.required,]],
      doj :['', [Validators.required,]],
      department:['', [Validators.required,]],
      designation :['', [Validators.required,]],
      totalExperience:['', [Validators.required,]],
      officeLocation:['', [Validators.required,]],
      password:['', [Validators.required,]],
      OtherExperience:['', [Validators.required,]],
      capeExperience:['', [Validators.required,]]
})

  }
  get f(){
    return this.RegisterationForm.controls;
  }
  
  submitFunction(){
    //validation trigger
this.submitted=true;
if(this.RegisterationForm.invalid){
return 
}
this.registerService.saveForm(this.register).subscribe(
  data =>{
    console.log("success")
  },
error =>{
  console.log("bug")
}
)

  }
}