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
  submitted: boolean = false;
  register = new Register();
  fullDate:any;
  priyanka:boolean=false;
  RegisterationForm!: FormGroup;
  Empid:any;

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
  empid(event: any){
   this.Empid=this.register.empid;
   let tempArr : any=[];


   this.registerService.getEmpid().subscribe(
    data => {
     tempArr = JSON.parse(data);
     for(let j of tempArr){
      if(j.empid==this.Empid){
        console.log("empid registered")
      }
      else{
        console.log("bug")
      }
     }
      
    },
    error => {
      console.log("empid err")
    }
  )

   }
    
  
  constructor(private formBuilder: FormBuilder,
    private registerService: RegisterserviceService
  ) { }
  ngOnInit(): void {
    this.RegisterationForm = new FormGroup({
      empid: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      maritalStatus: new FormControl('', Validators.required),
      mobile: new FormControl('', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
      alternate: new FormControl('', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      dateofjoining: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      totalExperience: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      otherExperience: new FormControl('', Validators.required),
      capeExperience: new FormControl('', Validators.required),
      managername: new FormControl('', Validators.required),
      manageremail: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    })
   
    
    

  }
  get field(): any {
    return this.RegisterationForm.controls;
  }
  
  // calcExperience(event:any,form:any){
  //   if(form.controls.capeExperience!=null && form.controls.capeExperience!=undefined && form.controls.capeExperience!="" &&
  //      form.controls.otherExperience!=null && form.controls.otherExperience!=undefined && form.controls.otherExperience!=""){
  //     var a=(form.controls.capeExperience.value+form.controls.otherExperience.value);
  //     form.controls.totalExperience.setValue(a);
  //   }
  // }
  // changevalue(e: any) {
  //   if (this.RegisterationForm.value.capeExperience != '' && this.RegisterationForm.value.otherexperience != '') {
  //     this.register.totalexperience = + this.register.capeExperience + +this.register.otherExperience
  //   }
  // }
  // changevalue(e:any){  
  //   this.currentDate = new Date();
  //   if(this.RegisterationForm.value.dateofjoining!='' && this.currentDate!=''){
  //     this.register.capeExperience = - this.register.dateofjoining - -this.currentDate
  //     if(this.RegisterationForm.value.capeExperience!=''&& this.RegisterationForm.value.otherExperience!=''){
  //       this.register.totalexperience = +this.register.capeExperience+ + this.register.otherExperience
  //     }

  //   }
  // }
//   doj(e:any){
//     this.currentDate=new Date();
//     if(this.RegisterationForm.value.dateofjoining!='' ){
//           this.register.capeExperience = -this.register.dateofjoining- -this.currentDate
//   }
// }
changevalue(e:any){
  if(
    this.RegisterationForm.value.otherExperience!=''&&
    this.RegisterationForm.value.otherExperience!=undefined&&
    this.RegisterationForm.value.dateofjoining!=''&&
    this.RegisterationForm.value.dateofjoining!=undefined
  ){
    var currentDate=new Date();
    var fullDate=new Date(this.register.dateofjoining);
    var capeExperience=Math.floor(
      currentDate.getTime()-fullDate.getTime());
    var day= 1000* 60 * 60 * 24;
    var days = Math.floor(capeExperience/day);
    var months = Math.floor(days/31);
    var years = Math.floor(months/12);
    var m = months% 12;
    this.register.capeexperience=Math.floor(months/12)+'.'+m;
    this.register.totalexperience = +this.register.capeexperience+ +this.register.otherexperience;
  }

}

  submitFunction() {
    //validation trigger
    this.submitted = true;
    if (this.RegisterationForm.invalid) {
      return
    }
  //   let mobileNumber: any
  // mobileNumber = this.register.mobilenumber;
  // this.register.mobilenumber= mobileNumber.Number;
  // debugger
    this.registerService.saveForm(this.register).subscribe(
      data => {
        this.priyanka=true;
        console.log("success")
      },
      error => {
        console.log("bug")
      }
    )

  }
  emailvalidation(e:any){
    if(!(e.target.value).includes('@capeindia.net')){
      console.log('errorr')
    }
  }
  States: any[] = ['select option','Andhra Pradesh', 'Andaman & Nicobar Islands', 'Arunachal Pradesh',
    'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujrat', 'Haryana', 'Himachal Pradesh',
    'Jammu & Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamilnadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];
}