import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControlName } from '@angular/forms';
import { HolidayservicesService } from '../services/holidayservices.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {
 
  holidays:FormGroup;
  ListData:any;
 

  constructor( private formBuilder : FormBuilder) { 
   
    this.ListData = [];


    this.holidays = this.formBuilder.group({
      date:['',Validators.required],
      day:['',Validators.required],
      description:['',Validators.required],
      year:['',Validators.required],
      workLocation:['',Validators.required]
    })
   }
 
   public addLeave (): void {
     this.ListData.push(this.holidays.value);
     this.holidays.reset();
   }

   reset(){
    this.holidays.reset();
   }

   removeLeave(element:any){
    this.ListData.forEach((value:any,index:any)=>{
      if(value == element)
      this.ListData.splice(index,1);
    });
   }


  ngOnInit(): void {
  }
}