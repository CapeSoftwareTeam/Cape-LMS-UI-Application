import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../models/register';
import { RegisterserviceService } from '../services/registerservice.service';
import { CscService } from '../csc.service';


interface Country {
  shortName: string;
  name: string;
}
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
  prod:boolean=false;
  prod1:boolean=false;
  prod2:boolean=false;
  prod3:boolean=false;
  RegisterationForm!: FormGroup;
  currentDate:any=new Date();
  Alternate:any;
  countries: Country[]=[]; 
  states: string[]=[];
  cities: string[]=[];
  Empid:any;
  Email:any;
  Mobile:any;
  countryCode:any;
  stateList1: any=[];
  countryList: any=[];
  Hide:boolean=true;


  
  // subscriptions:Subscription[]=[];
  
  // countryDropdownSettings:any=[];
  // stateDrodownSettings: any;
  // cityDropdownSettings: any;
  // countries :ICountry[] = [];
  // states : IState[] = [];
  // cities : ICity[] = [];
  // selectedCountryCode: any;
  // stateList1: any=[];
  // countryList: any=[];
 
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
  changeCountry1(e: any) {
     let changedValue;
     if(e.target != undefined) {
     changedValue = e.target.value;
      
    }
    else{
     changedValue = e;
    }
    this.stateList1 = [];
   for(let arr of this.countryList) {
     if( arr.name == changedValue) {
   this.siteService.retrieveState(arr.code).subscribe(
    data => {
   this.stateList1 = JSON.parse(data) 
  
    }
    )};
     }
  }
// changeCountry1(e:any){
//   let changedValue;
//   if(e.target!=undefined){
//     changedValue = e.target.value;

//   }
//   else{
//     changedValue=e;
//   }
//   this.countryList=[];
 
      
    
  
// }
  
//checking empid duplicates 
  empid(event: any){
   this.Empid=this.register.empid;
   
   let tempArr : any=[];
   
   this.registerService.getEmpid().subscribe(
    data => {
   
     tempArr = JSON.parse(data);
     for(let j of tempArr)
     {
      if(j.empid==this.Empid ){
        this.prod=true;
      }
       }
         setTimeout(() => {
          this.prod = false;
          
        }, 3000);
        console.log("empid registered")
        // else{
        //   console.log("bug")
        // }
      }
    
     )
    
     }
     // checking mobile number duplicates
 mobile(event:any){
  // this.register.mobilenumber='+'+ this.countryCode +'-' + this.RegisterationForm.value.mobile
      this.Mobile= this.register.mobilenumber;
      let  tempArr : any=[];

this.registerService.getEmpid().subscribe(
  data =>{
    tempArr = JSON.parse(data);
    for(let j of tempArr){
     
      if(j.mobilenumber==this.Mobile){
this.prod1=true;
setTimeout(() => {
  this.prod1=false;
}, 3000);
console.log("same mobilenumber")
      }
    }
  }
)
           
     }
     //checking alternate mobile number duplicates
 alter(event:any){
  // this.register.alternatenumber='+'+ this.countryCode +'-' + this.RegisterationForm.value.alternate
  this.Alternate = this.register.alternatenumber;
  let tempArr : any=[];
  this. registerService.getEmpid().subscribe(
    data =>{
      tempArr = JSON.parse(data);
      for(let j of tempArr){
        if(j.alternatenumber== this.Alternate){
          this.prod2=true;
          setTimeout(()=>{
            this.prod2=false;
          }, 3000);
          console.log("same alternatenumber")
        }
      }
    }
  )
 }

     
   //checking email duplicates     
   email(event:any){
   
    this.Email=this.register.emailid;
    let tempArr:any=[];
    this.registerService.getEmpid().subscribe(
      data=>{
        tempArr = JSON.parse(data);
        for(let j of tempArr){
          if(j.emailid==this.Email){
            this.prod3 = true;
            setTimeout(()=>{
              this.prod3=false;
            },3000);
            console.log("same email")
          }
        }
      }

    )
   }

   

  



  
  //  getCountries(){
  //   this.countries=csc.getAllCountries();
  // }
  // getState(countryCode:any){
  //   this.states=csc.getStatesOfCountry(this.countryCode);
  // }

  // getCity(countryCode:any,stateCode:any){
  //  this.cities=csc.getCitiesOfState(this.countryCode);

  // }
  // initDropdownSettings(){
  //   this.countryDropdownSettings={ 
  //     singleSelection: true,
  //     idField: 'isoCode',
  //     textField: 'name',
  //      selectAllText: 'Select All',
  //     unSelectAllText: 'UnSelect All',
  //     itemsShowLimit :3,
  //     allowSearchFilter:true,
  //     maxHeight:'100'
  //   };
  // }
 
   
  
  constructor(private formBuilder: FormBuilder,private route: Router,
    private registerService: RegisterserviceService, private siteService:CscService
  ) { 
    // this.countries = this. siteService.getCountries();
    // this.form = new FormGroup({
    //   country: this.country,
    //   state: this. state,
    //   city: this.city,
    // });
  }
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
      country:new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      otherExperience: new FormControl('', Validators.required),
      capeExperience: new FormControl('', Validators.required),
      managername: new FormControl('', Validators.required),
      manageremail: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
     
    })
   
    this.siteService.retrieveCountry().subscribe(
      data => {
        this.countryList = JSON.parse(data);
        console.log( this.countryList)
      }
    )

    this.countryCode='91';
    // this.initForm();
    // this.initDropdownSettings();
    // this.getCountries();

  }
//   handleValueChanges(){
//     this.subscriptions.push (this.RegisterationForm.get('country')?.value.subscribe((response: { isoCode: any; }[])=>{
//       console.log('selected country is', response);
//       this.selectedCountryCode = response[0].isoCode;
//       this.getState(response[0].isoCode);
//       }));
// this.subscriptions.push(this.RegisterationForm.get('state')?.value.subscribe((response: { isoCode: any; }[]) =>{
//    console.log('state selection', response);
//    this.getCity(this.selectedCountryCode,response[0].isoCode);
// }));
//     }  
  
  initForm(){
    this.RegisterationForm=this.formBuilder.group({
      country:[''],
      state:[''],
      city:['']
    })
   
  // this.getCountries();
  // this.initDropdownSettings();
  // this.countryDropdownSettings();
  //   this.handleValueChanges();
   


//   this.countryChange.valueChanges.subscribe((country))=>{
//     this.states.reset();
//     this.states.disable();
//     if(country){
//       this.states=this.siteService.getStatesByCountry(country);
//       this.states.enable();
//     }
//   }
//  this.states.valueChanges.subscribe((state))=>{
//   this.city.reset();
//   this.city.disable();
//   if(state){
//     this.cities = this. siteService.getcitiesByState(this.countryChange.value, state);
//     this.city.enable();
//   }
//  }
  }
  getemail(event:any){
    
    if(event.target.value=='gk@capeindia.net'|| event.target.value=='srp@capeindia.net'||event.target.value=='asha@capeindia.net'||event.target.value=='vasanthi@capeindia.net'||event.target.value=='arun@capeindia.net'){
      this.Hide=false;
    }
    else{
      this.Hide=true;
    }
      

  }

  
//   changeCountry(e:any){
    
// let changedValue;
//  if(e.target != undefined) {
// changedValue = e.target.value;
//  }
//  else{
//  changedValue = e;
//  }
// this.stateList1 = [];
//  for(let arr of this.countryList) {
// if( arr.name == changedValue) {
//  this.siteService.retrieveSite(arr.code).subscribe(
//  data => {
//  this.stateList1 = JSON.parse(data)
// }
//  )};

//   }
// }
    
 
  get field(): any {
    return this.RegisterationForm.controls;
  }
  
  

  
  
  
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
countryChange(country: any) {
  this.countryCode = country.dialCode;
}

clear(){
  this.RegisterationForm.reset();
}
  submitFunction() {

  
    this.submitted = true;
    if (this.RegisterationForm.invalid) {
      return
    }
  this.register.mobilenumber='+'+ this.countryCode +'-' + this.RegisterationForm.value.mobile
  this.register.alternatenumber='+'+ this.countryCode +'-'+ this.RegisterationForm.value.alternate
  this.register.country=
     this.registerService.saveForm(this.register).subscribe(
      data => {
        this.priyanka=true;
        setTimeout(() => {
          this.priyanka = false;
          this.clear();
          this.submitted = false;
        }, 3000);
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
  Home(){
    this.route.navigate(['/home']);
  }

  
  // handleButtonClick(){
  //   if(!this.RegisterationForm.valid) this.RegisterationForm.markAllAsTouched();
  // }
  
}