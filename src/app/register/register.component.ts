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
  mobile : new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
  alternate : new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
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
  otherExperience : new FormControl(''),
  capeExperience : new FormControl(''),
  })
  
  // Only Accept numbers
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
      mobile:['', [Validators.required, ]],
      alternate:['', [Validators.required,]],
      email:['', [Validators.required,]],
      doj :['', [Validators.required,]],
      department:['', [Validators.required,]],
      designation :['', [Validators.required,]],
      totalExperience:['', [Validators.required,]],
      officeLocation:['', [Validators.required,]],
      password:['', [Validators.required,]],
      otherExperience:['', [Validators.required,]],
      capeExperience:['', [Validators.required,]]
})

  }
  get field(){
    return this.RegisterationForm.controls;
  }
  
  // calcExperience(event:any,form:any){
    
  //   if(form.controls.capeExperience!=null && form.controls.capeExperience!=undefined && form.controls.capeExperience!="" &&
  //      form.controls.otherExperience!=null && form.controls.otherExperience!=undefined && form.controls.otherExperience!=""){
  //     var a=(form.controls.capeExperience.value+form.controls.otherExperience.value);
  //     form.controls.totalExperience.setValue(a);
  //   }
  // }

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