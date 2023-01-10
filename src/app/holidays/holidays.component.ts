import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { Holiday } from '../models/holiday';
import { HolidayservicesService } from '../services/holidayservices.service';
import { MatSelectModule } from '@angular/material/select';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalErrorHandlerService } from '../services/global-error-handler.service';


@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {

  @ViewChild('allSelected') select!: MatSelect;
  
  locationList: string[] = ['TamilNadu', 'Andhra Pradesh', 'Karnataka', 'Kolkata', 'West', 'North', 'Odisha'];
  allSelected: boolean = false;
  spinner: boolean = false;
  blurMode: boolean = false;
  submitted: boolean = false;
  disableSubmitBtn: boolean = true;
  disableAddBtn: boolean = false;
  disableResetBtn: boolean = false;
  disableRemoveBtn: boolean = false;
  holidays: FormGroup;
  ListData: any;
  holidayDate: any;
  showDateMsg: boolean = false;
  successMsg: boolean = false;
  showForm: boolean = false;
  holiday = new Holiday();
  weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  checkHolidayMsg: boolean = false;
  formDirty:any;
  modalReference:any;
  showErrorMessage: boolean = false;
  errorMessage: string='';

  constructor(private formBuilder: FormBuilder, private holidaysService: HolidayservicesService,
    private route: Router,
    private modalService:NgbModal,
    private globalErrorHandler: GlobalErrorHandlerService) {
    this.ListData = [];
    this.holidays = this.formBuilder.group({
      date: ['', Validators.required],
      day: ['', Validators.required],
      description: ['', Validators.required],
      year: ['', Validators.required],
      workLocation: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(alertTemplate:any): void{
    if(this.ListData.length!=0){
      this.modalReference= this.modalService.open(this.formDirty,
        {centered:true,
          size: 'm',
          backdrop:'static', 
          keyboard  : false })
        
          this.checkHolidayMsg = true;
          setTimeout(() => {
            this.checkHolidayMsg = false;
          }, 300000);
    
    }
  }

  closeTemp(alertTemplate:any){
    this.modalReference.close();
  }

  // Add leaves in Table
  addLeave(alertTemplate:any): void {
   this.formDirty = alertTemplate;
    let flag = true;
    this.submitted = true;
    if (this.holidays.invalid) {
      return
    }
     if(this.ListData.length!=0){
      for(let i of this.ListData){
        if(i.date==this.holidays.value.date){
          this.showDateMsg = true;
          setTimeout(() => {
            this.showDateMsg = false;
          }, 3000);
          flag = false;
        }
      }
     }
     if(flag){
      this.ListData.push(this.holidays.value);
      this.resetForm();
      this.disableSubmitBtn = false;
     }

  }

  

  // Submiting Holidays 
  submit() {
    for (let i = 0; i < this.ListData.length; i++) {
      let workLocation = '';
      for (let value of this.ListData[i].workLocation) {
        if (workLocation == '') {
          workLocation = value;
        }
        else {
          workLocation = workLocation + "," + value;
        }
      }
      this.ListData[i].workLocation = workLocation;
    }
    this.holidaysService.saveLeave(this.ListData).subscribe(data => {
      this.spinner = true;
      this.blurMode = true;
      setTimeout(() => {
        this.spinner = false;
        this.blurMode = false;
        this.successMsg = true;
        this.disableSubmitBtn = true;
        // this.disableResetBtn = false;
        this.ListData = [];
        setTimeout(() => {
          this.successMsg = false;
        }, 2000);
      }, 3000)
    }, error=>{
      this.showErrorMessage=true;
      this.errorMessage=this.globalErrorHandler.errorMessage;
      setTimeout(() => {
        this.showErrorMessage=false;
      }, 3000);

    })
  }

  // Reset Added Leaves
  resetLeave() {
    this.ListData = [];
    this.disableSubmitBtn = true;
  }

  // Reset Holidays Form
  resetForm() {
    this.holidays.reset();
    this.submitted = false;
  }

  // Remove added leaves From table
  removeLeave(element: any) {
    this.ListData.forEach((value: any, index: any) => {
      if (value == element)
        this.ListData.splice(index, 1);
    });
    this.disableSubmitBtn = true;
  }

  // Change Day(Integer 1-7 ) into String Format
  DateFormatchange(event: any) {
    this.holiday.day = this.weekday[event.target.valueAsDate.getDay()];
    this.holiday.year = event.target.valueAsDate.getFullYear();
  }

  // Navigation
  navigateToHome() {
    if(this.ListData.length==0){
      this.route.navigate(['/home'])
    }else{
      this.checkHolidayMsg = true;
      setTimeout(() => {
        this.checkHolidayMsg = false;
      }, 3000);
    }
 
  }

  get field(): any {
    return this.holidays.controls;
  }

  toggleAllSelection() {
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => {
        console.log( item.select());
        if(item.viewValue == 'Select All'){
          item.deselect()
        }
        else{
          item.select();
        }
      } );
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

}