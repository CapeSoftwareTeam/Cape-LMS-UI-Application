import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { end, start } from '@popperjs/core';
import { ApplyLeave } from '../models/apply-leave.model';
import { Register } from '../models/register';
import { ApplyleaveService } from '../services/applyleave.service';
import { HolidayservicesService } from '../services/holidayservices.service';
import { LeaveStatusServiceService } from '../services/leave-status-service.service';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {
  showMorning: boolean = false;
  callLms: boolean = true;
  back: boolean = false;
  @Output() backflow = new EventEmitter();
  modeModal: boolean = true;
  leave: any = [];
  empid: any;
  selectedItem: any;
  dayOfWeek: any = [];
  fromdate: any;
  todate: any;

  FrommyDateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }
  TomyDateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }
  modalReference: any;
  countinNumber: any;
  personDetails = new Register();
  name: any;
  designation: any;
  department: any;
  experience: any;
  location: any;
  managername: any;
  Alternatesaturday: any = [];
  thismonth: any;
  thisyear: any;
  saturdays: any;
  nextmonth: any;
  nextyear: any;
  holidays: any = [];
  Includepublicholiday: any;
  manageremail: any;


  constructor(private route: Router,
    private apply: ApplyleaveService,
    private fb: FormBuilder,
    private getDetails: ApplyleaveService,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal,
    private registerDetails: LeaveStatusServiceService,
    private getPublicHolidays: HolidayservicesService) { }

  applyLeave = new ApplyLeave();

  postleave !: FormGroup;

  ngOnInit(): void {


    this.empid = sessionStorage.getItem("empid");

    this.getPublicHolidays.getLeave().subscribe(
      data => {
        let temp=[];
        this.Includepublicholiday = JSON.parse(data);
        for(let leave of this.Includepublicholiday){
          this.holidays.push(leave.date);
          
        }
      }
    );

    
    this.registerDetails.getMemberDetails(this.empid).subscribe(
      data => {
        this.personDetails = JSON.parse(data);

        this.name = this.personDetails.name;
        console.log(this.name);
        this.department = this.personDetails.department;
        this.designation = this.personDetails.designation;
        this.experience = this.personDetails.totalexperience;
        this.location = this.personDetails.city;
        this.managername = this.personDetails.managername;
        this.manageremail = this.personDetails.manageremail
        ;
      })


    console.log(this.empid);
    this.postleave = new FormGroup({
      leaveType: new FormControl(''),
      noofdays: new FormControl(''),
      fromdate: new FormControl(''),
      todate: new FormControl(''),
      reasonforapply: new FormControl(''),
      status: new FormControl('pending'),
    });
    // this.getnumber();
    this.getPublicHolidays.getLeave().subscribe(
      data => {
        this.Includepublicholiday = JSON.parse(data);
        console.log(this.Includepublicholiday);
        for(let e=0;e<=this.Includepublicholiday;e++){
        // for(let e of this.Includepublicholiday){
        this.holidays=this.Includepublicholiday.date;
        console.log(this.holidays);
      }
    }
    );

    this.registerDetails.getMemberDetails(this.empid).subscribe(
      data => {
        this.applyLeave = JSON.parse(data);
      }
    )
  }
  leaveApply(success: any) {
    if (this.selectedItem == 'casual') {
      let lastDate = this.applyLeave.approveddate.getMonth;
      let cl = this.applyLeave.casualLeave;
      let presentDate = this.applyLeave.createddate.getMonth;
      if (presentDate == lastDate) {
        console.log("openmodal popup and say no casual leave is available");
      }
    }

    this.applyLeave.empid = this.empid;
    this.applyLeave.name = this.name;
    this.applyLeave.department = this.department;
    this.applyLeave.designation = this.designation;
    this.applyLeave.experience = this.experience;
    this.applyLeave.location = this.location;
    this.applyLeave.managername = this.managername;
    this.applyLeave.manageremail= this.manageremail;
    this.applyLeave.leaveType = this.postleave.value.leaveType;
    this.applyLeave.noofdays = this.countinNumber;
    this.applyLeave.fromdate = this.postleave.value.fromdate;
    this.applyLeave.todate = this.postleave.value.todate;
    this.applyLeave.reasonforapply = this.postleave.value.reasonforapply;
    this.applyLeave.status = this.postleave.value.status;
    this.apply.leaveRegister(this.applyLeave).subscribe(
      data => { this.leave.push(this.applyLeave) }
    )
    this.modalReference = this.modalService.open(success, { size: 'm' })
    console.log("applied")
  }
  cancel() {
    this.route.navigate(['/home']);
  }
  selected() {
    console.log(this.selectedItem);
  }
  save() {
    this.applyLeave.empid = this.empid;
    this.applyLeave.name = this.name;
    this.applyLeave.department = this.department;
    this.applyLeave.designation = this.designation;
    this.applyLeave.experience = this.experience;
    this.applyLeave.location = this.location;
    this.applyLeave.managername = this.managername;
    this.applyLeave.manageremail=this.manageremail;
    this.applyLeave.leaveType = this.postleave.value.leaveType;
    this.applyLeave.noofdays = this.countinNumber;
    this.applyLeave.fromdate = this.postleave.value.fromdate;
    this.applyLeave.todate = this.postleave.value.todate;
    this.applyLeave.reasonforapply = this.postleave.value.reasonforapply;
    this.applyLeave.status = 'not submitted';
    this.apply.leaveRegister(this.applyLeave).subscribe(
      data => { this.leave.push(this.postleave) }
    )
    this.route.navigate(['/home']);
  }

  count: any;
  pluscount: any;
  difference: any;
  differentdays: any;
  getfirstnumber() {
    this.count = this.fromdate;
    console.log(this.count);
  }
  getsecondnumber() {
    this.pluscount = this.todate;
    console.log(this.pluscount);
  }
  getnumber() { 
    this.registerDetails.getMemberDetails(this.empid).subscribe(
      data => {
        this.personDetails = JSON.parse(data);
        this.department = this.personDetails.department;
      });
   
    let dd = this.count;
   
    let d = this.pluscount;
    
    this.empid = sessionStorage.getItem("empid");

    if (this.department != 'Software') {
      console.log(this.department)
      // for complete saturday and sunday
      var getDateArray = function (start: string | number | Date, end: number | Date) {
        var arr = new Array();
        var dt = new Date(start);
        console.log("dt=", dt);
        while (dt <= end) {
          arr.push((new Date(dt)).toString().substring(0, 15)); //save only the Day MMM DD YYYY part
          dt.setDate(dt.getDate() + 1);
        }
        return arr;
      }
      var prepareDateArray = function (dtArr: string | any[]) {
        var arr = new Array();
        for (var i = 0; i < dtArr.length; i++) {
          arr.push((new Date(dtArr[i])).toString().substring(0, 15)); //save only the Day MMM DD YYYY part
        }
        return arr;
      }
      function getSaturdays(year: number, month: number) {
        let day, date;
        let saturdays = [];
        day = 1;
        date = new Date(year, month, day);
        while (date.getMonth() === month) {
          if (date.getDay() === 6) { // Sun=0, Mon=1, Tue=2, etc.
            saturdays.push(new Date(year, month, day));
          }
          day += 1;
          date = new Date(year, month, day);
          console.log(date)
        }
        console.log(saturdays)
        return saturdays;
      }

      if (this.count.getMonth() == this.pluscount.getMonth() && this.count.getFullYear() == this.pluscount.getFullYear()) {
        this.thismonth = this.count.getMonth(); this.nextmonth = this.pluscount.getMonth();
        this.thisyear = this.count.getFullYear(); this.nextyear = this.pluscount.getFullYear();
        this.saturdays = getSaturdays(this.thisyear, this.thismonth).filter((day, index) => index % 2 == 0);
        console.log(this.saturdays)
        for (let r = 0; r < this.saturdays.length; r++) {

          let tempDate = this.saturdays[r].getMonth() + 1;
          this.Alternatesaturday.push(this.saturdays[r].getFullYear() + "-" + tempDate + "-" + this.saturdays[r].getDate()) + 1
        }
        console.log(this.Alternatesaturday);
      }
      else if ((this.count.getFullYear() != this.pluscount.getFullYear()) || this.count.getMonth() != this.pluscount.getMonth()) {
        this.Alternatesaturday = [];
        this.thismonth = this.count.getMonth(); this.nextmonth = this.pluscount.getMonth();
        this.thisyear = this.count.getFullYear(); this.nextyear = this.pluscount.getFullYear();
        // if(this.saturdays.getMonth()== this.count.getMonth()){
        // this.saturdays = getSaturdays(this.thisyear, this.thismonth).filter((day, index) => index % 2 == 0);
        // }
        // if(this.saturdays.getMonth()== this.pluscount.getMonth()){
        this.saturdays = getSaturdays(this.nextyear, this.nextmonth).filter((day, index) => index % 2 == 0);
        // }

        console.log(this.saturdays)
        for (let r = 0; r < this.saturdays.length; r++) {
          let tempDate = this.saturdays[r].getMonth() + 1;
          this.Alternatesaturday.push(this.saturdays[r].getFullYear() + "-" + tempDate + "-" + this.saturdays[r].getDate());
        }
      }
      //  else if(this.count.getMonth()==this.pluscount.getMonth()){}
      // if(this.saturdays.getMonth()== this.count.getMonth())

      //     this.Alternatesaturday=[];
      //    this.saturdays = getSaturdays(this.thisyear, this.thismonth).filter((day, index) => index % 2 == 0);
      //    this.saturdays = getSaturdays(this.nextyear, this.nextmonth).filter((day, index) => index % 2 == 0);
      //     console.log(this.saturdays)

      //   for(let r=0;r<this.saturdays.length;r++){

      //     let tempDate=this.saturdays[r].getMonth()+1;
      //     this.Alternatesaturday.push(this.saturdays[r].getFullYear()+"-"+tempDate+"-"+this.saturdays[r].getDate())

      //   }
      //   console.log( this.Alternatesaturday );
      //    }
      var getWorkingDateArray = function (dates: any[], hoildayDates: any[], workingWeekendDates: any[]) {
        var arr = dates.filter(function (dt: any) {
          return holidaysArray.indexOf(dt) < 0;
        });

        var result = arr.filter(function (dt: any) {
          console.log(dt.indexOf("Sat") > -1 || dt.indexOf("Sun") > -1);
          if (dt.indexOf("Sat") > -1 || dt.indexOf("Sun") > -1) {
            if (workingWeekendDates.indexOf(dt) > -1) {
              return dt;
            }
          }
          else {
            return dt;
          }
        });

        return result;

      }

      

      var startDate = new Date(this.count); //YYYY-MM-DD
      var endDate = new Date(this.pluscount); //YYYY-MM-DD

      var officalHolidays = this.holidays; //YYYY-MM-DD
      var workingWeekends = this.Alternatesaturday;//YYYY-MM-DD
      console.log(workingWeekends);
  
      var dateArray = getDateArray(startDate, endDate);

      var holidaysArray = prepareDateArray(officalHolidays);

      var workingWeekendsArray = prepareDateArray(workingWeekends);

      var workingDateArray = getWorkingDateArray(dateArray, holidaysArray, workingWeekendsArray);
      console.log(workingDateArray);

      this.countinNumber = workingDateArray.length;
      console.log(workingDateArray.length);
    }

    if (this.department == 'Software') {
      var getDateArray = function (start: string | number | Date, end: number | Date) {
        var arr = new Array();
        var dt = new Date(start);
        console.log("dt=", dt);
        while (dt <= end) {
          arr.push((new Date(dt)).toString().substring(0, 15)); //save only the Day MMM DD YYYY part
          dt.setDate(dt.getDate() + 1);

        }
        console.log(arr);
        return arr;
      }
      function getSaturdays(year: number, month: number) {
        let day, date;
        let saturdays = [];
        day = 1;
        date = new Date(year, month, day);
        while (date.getMonth() === month) {
          if (date.getDay() === 6) { // Sun=0, Mon=1, Tue=2, etc.
            saturdays.push(new Date(year, month, day).getDate());
          }
          // date = new Date(year, month, day);
          day += 1;
          date = new Date(year, month, day);
          console.log(date)
        }
        console.log(saturdays)
        return saturdays;
      }
      this.saturdays = getSaturdays(this.thisyear, this.thismonth).filter((day, index) => index % 2 == 0);

      var prepareDateArray = function (dtArr: string | any[]) {
        var arr = new Array();
        for (var i = 0; i < dtArr.length; i++) {
          arr.push((new Date(dtArr[i])).toString().substring(0, 15)); //save only the Day MMM DD YYYY part
        }
        console.log("in prepare array", arr)
        return arr;
      }

      var getWorkingDateArray = function (dates: any[], hoildayDates: any[], workingWeekendDates: any[]) {

        //       // remove holidays
        var arr = dates.filter(function (dt: any) {
          return holidaysArray.indexOf(dt) < 0;
        });

        //       // remove weekend dates that are not working dates
        var result = arr.filter(function (dt: any) {
          console.log(dt.indexOf("Sat") > -1 || dt.indexOf("Sun") > -1);
          if (dt.indexOf("Sat") > -1 || dt.indexOf("Sun") > -1) {

            // if((saturdays.)&&(dt.indexOf("Sun")-1)){
            if (workingWeekendDates.indexOf(dt) > -1) {
              return dt;
            }
          }
          else {
            return dt;
          }
        });
        return result;
      }
      this.getPublicHolidays.getLeave().subscribe(
        data => {
          let temp=[];
          this.Includepublicholiday = JSON.parse(data);
          for(let leave of this.Includepublicholiday){
            this.holidays.push(leave.date);
            
          }
        }
      );
      var startDate = new Date(this.count); //YYYY-MM-DD
      var endDate = new Date(this.pluscount); //YYYY-MM-DD
      officalHolidays = this.holidays //YYYY-MM-DD
      workingWeekends = ["2021-10-05"] //YYYY-MM-DD

      var dateArray = getDateArray(startDate, endDate);

      var holidaysArray = prepareDateArray(officalHolidays);

      var workingWeekendsArray = prepareDateArray(workingWeekends);

      var workingDateArray = getWorkingDateArray(dateArray, holidaysArray, workingWeekendsArray);
      console.log(workingDateArray);
      
      this.countinNumber = workingDateArray.length;
      console.log(workingDateArray.length);
    }
  }

  ok() {
    this.modalReference.close();
    this.route.navigate(['/home']);
  }
  hideDays() {
    this.showMorning = false;
  }
  showDays() {
    this.showMorning = true;
  }

}
