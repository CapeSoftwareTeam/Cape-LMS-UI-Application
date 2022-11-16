import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { Holiday } from '../models/holiday';
import { HolidayservicesService } from '../services/holidayservices.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {
 
  submitted:boolean=false;
  holidays:FormGroup;
  holidaysAdd!: FormGroup;
  ListData:any;
  show:boolean=true;
  successMsg:boolean=false;
  showForm:boolean=false;
  holiday=new Holiday();

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
   this.holidaysService.saveLeave(this.ListData).subscribe(data=>
    {
      this.successMsg=true;
      setTimeout(()=>{
          this.successMsg=false;
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


  ngOnInit(): void {
    
  }
  // Back Button
  // back(){
  //   this.route.navigate(['/lmspage'])
  // }
  
  get field():any{
    return this.holidays.controls;
  }

}