import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
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

  successMsg: boolean = false;
  showForm: boolean = false;
  holiday = new Holiday();
  weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


  constructor(private formBuilder: FormBuilder, private holidaysService: HolidayservicesService,
    private route: Router) {
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

  // Add leaves in Table
  public addLeave(): void {
    this.submitted = true;
    if (this.holidays.invalid) {
      return
    }
    this.ListData.push(this.holidays.value);
    this.resetForm();
    this.disableSubmitBtn = false;

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
  }

  // Change Day(Integer 1-7 ) into String Format
  DateFormatchange(event: any) {
    this.holiday.day = this.weekday[event.target.valueAsDate.getDay()];
    this.holiday.year = event.target.valueAsDate.getFullYear();
  }

  // Navigation
  navigateToHome() {
    this.route.navigate(['/home'])
  }

  get field(): any {
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