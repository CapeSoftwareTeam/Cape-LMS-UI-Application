import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Register } from '../models/register';
import { CalculationPipe } from '../pipe/calculation.pipe';
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
  RegisterationForm!: FormGroup;
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
this.RegisterationForm = new FormGroup({
  empid : new FormControl('',Validators.required),
  name  :new FormControl('',Validators.required),
  gender  :new FormControl('',Validators.required),
  dob   :new FormControl('',Validators.required),
  maritalStatus  :new FormControl('',Validators.required),
  mobile  :new FormControl('',[Validators.required,Validators.min(1000000000),Validators.max(9999999999)]),
  alternate  :new FormControl('', [Validators.required,Validators.min(1000000000),Validators.max(9999999999)]),
  email  :new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  doj   :new FormControl('',Validators.required),
  department  :new FormControl('',Validators.required),
  designation   :new FormControl('',Validators.required),
  totalExperience  :new FormControl('',Validators.required),
  state:new FormControl('',Validators.required),
  city:new FormControl('',Validators.required),
  password  :new FormControl('',Validators.required),
  otherExperience  :new FormControl('',Validators.required),
  capeExperience : new FormControl('',Validators.required)
})
}
get field(): any
 {
    return this.RegisterationForm.controls;
  }
 // calcExperience(event:any,form:any){
//   if(form.controls.capeExperience!=null && form.controls.capeExperience!=undefined && form.controls.capeExperience!="" &&
//      form.controls.otherExperience!=null && form.controls.otherExperience!=undefined && form.controls.otherExperience!=""){
//     var a=(form.controls.capeExperience.value+form.controls.otherExperience.value);
//     form.controls.totalExperience.setValue(a);
//   }
// }
changevalue(e:any)
{
    if(this.RegisterationForm.value.capeExperience!=''&& this.RegisterationForm.value.otherexperience!=''){
     this.register.totalexperience= + this.register.capeExperience+ +this.register.otherExperience
    }
  }
submitFunction()
{
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
   States:any[]= ['Andhra Pradesh','Andaman & Nicobar Islands','Arunachal Pradesh',
'Assam','Bihar','Chandigarh','Chhattisgarh','Delhi','Goa','Gujrat','Haryana','Himachal Pradesh',
'Jammu & Kashmir','Jharkhand','Karnataka','Kerala','Ladakh','Lakshadweep','Madhya Pradesh',
'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Puducherry','Punjab','Rajasthan',
'Sikkim','Tamilnadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'];
}