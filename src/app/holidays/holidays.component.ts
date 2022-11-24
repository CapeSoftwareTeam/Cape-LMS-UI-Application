import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { Holiday } from '../models/holiday';
import { HolidayservicesService } from '../services/holidayservices.service';
import { MatSelectModule } from '@angular/material/select';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';



@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {
 
  @ViewChild('select') select!: MatSelect;

  locationList: string[] = ['TamilNadu', 'Andhra Pradesh', 'Karnataka', 'Kolkata', 'West', 'North','Odisha'];
  allSelected:boolean = false;
  spinner:boolean=false;
  blurMode:boolean=false;
  submitted:boolean=false;
  holidays:FormGroup;
  holidaysAdd!: FormGroup;
  ListData:any;
  show:boolean=true;
  successMsg:boolean=false;
  showForm:boolean=false;
  holiday=new Holiday();
  weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


  constructor( private formBuilder : FormBuilder,private holidaysService:HolidayservicesService,
    private route:Router) { 
   
    this.ListData = [];

    

    this.holidays = this.formBuilder.group({
      date:['',Validators.required],
      day:['',Validators.required],
      description:['',Validators.required],
      year:['',Validators.required],
      workLocation:['',Validators.required]
    })
   }
//    gokul(){
//     const birthday = new Date(this.holidays.value.date);
// const day1 = birthday.getDay();

    
  
//    }


   public addLeave (): void {
    this.submitted = true;
    if (this.holidays.invalid) {
      return
    }
     this.ListData.push(this.holidays.value);
   this.reset();
    
   }
   
   submit(){
   
    for(let i=0; i<this.ListData.length;i++){
      let workLocation = '';
      for(let value of  this.ListData[i].workLocation){
        if(workLocation == ''){
          workLocation = value;  
        }
        else{
          workLocation = workLocation +","+ value;  
        }
       
      }
      
       this.ListData[i].workLocation = workLocation;
    }
    
   this.holidaysService.saveLeave(this.ListData).subscribe(data=>
    {
     // this.successMsg=false;
      this.spinner=true;
      this.blurMode=true;
      setTimeout(()=>{
          
          this.spinner=false;
          this.blurMode=false;
          this.successMsg=true;
          setTimeout(() => {
            this.successMsg = false;
          }, 2000);
          this.ngOnInit();
      },3000)
    
    })

   }

   reset(){
    this.holidays.reset();
    this.submitted = false;
   }

   removeLeave(element:any){
    this.ListData.forEach((value:any,index:any)=>{
      if(value == element)
      this.ListData.splice(index,1);
    });
   }

   DateFormatchange(event:any){
   
     this.holiday.day = this.weekday[event.target.valueAsDate.getDay()];
     this.holiday.year =  event.target.valueAsDate.getFullYear();
   }

  ngOnInit(): void {
    
  }
  // Back Button
  backToHome(){
    this.route.navigate(['/home'])
  }
  
  get field():any{
    return this.holidays.controls;
  }
  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }
  

}