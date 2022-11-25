import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { end, start } from '@popperjs/core';
import { ApplyLeave } from '../models/apply-leave.model';
import { Register } from '../models/register';
import { ApplyleaveService } from '../services/applyleave.service';
import { LeaveStatusServiceService } from '../services/leave-status-service.service';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {
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
  personDetails= new Register();
  name: any;
  designation: any;
  department: any;
  experience: any;
  location: any;
  managername: any;


  constructor(private route: Router,
    private apply: ApplyleaveService,
    private fb: FormBuilder,
    private getDetails: ApplyleaveService,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal,
    private registerDetails: LeaveStatusServiceService) { }

  applyLeave = new ApplyLeave();

  postleave !: FormGroup;

  ngOnInit(): void {
    this.empid = sessionStorage.getItem("empid");
    this.registerDetails.getMemberDetails(this.empid).subscribe(
      data => {
        this.personDetails = JSON.parse(data);
      
        this.name = this.personDetails.name;
        console.log(this.name);
        this.department = this.personDetails.department;
        this.designation = this.personDetails.designation;
        this.experience=this.personDetails.totalexperience;
        this.location=this.personDetails.city;
        this.managername=this.personDetails.managername;
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
    this.getnumber();
   
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
 
      this.applyLeave.empid=this.empid;
      this.applyLeave.name=this.name;
      this.applyLeave.department=this.department;
      this.applyLeave.designation=this.designation;
      this.applyLeave.experience=this.experience;
      this.applyLeave.location=this.location;
      this.applyLeave.managername=this.managername;
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
  save(){
    this.applyLeave.empid=this.empid;
    this.applyLeave.name=this.name;
    this.applyLeave.department=this.department;
    this.applyLeave.designation=this.designation;
    this.applyLeave.experience=this.experience;
    this.applyLeave.location=this.location;
    this.applyLeave.managername=this.managername;
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
  // let dateString = CurrentDate;
  // try {
  //     Date = new SimpleDateFormat("dd/mm/yyyy").parse(dateString);
  // }
  //   Calendar c = Calendar.getInstance();
  //   c.setTime(date);
  // dayOfWeek = { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" };
  //  day = this.dayOfWeek[c.get(Calendar.DAY_OF_WEEK) - 1];
  //   int dayOfYear = c.get(Calendar.DAY_OF_MONTH) / 7 + 1 ;
  // weekendsDatesFilter = (d: Date) => {
  //   const day = d.getDay();

  //   /* Prevent Saturday and Sunday for select. */
  //   return day !== 0 && day !== 6;

  // }
  count: any;
  pluscount: any;
  difference: any;
  differentdays: any;

  getfirstnumber() {
    // console.log(date1);
    this.count = this.fromdate;
    console.log(this.count);
  }
  getsecondnumber() {
    this.pluscount = this.todate;
    console.log(this.pluscount);
  }
  getnumber() {
    // var today = new Date();
    // var ddsr = String(today.getDate());
    // console.log(ddsr)
    //     var mm = String(today.getMonth() + 1) //January is 0!
    //     var yyyy = today.getFullYear();
    //     console.log(mm);
    //   var days=String(today.getDay());
    // console.log(days);
    // if()
    let dd = this.count;
    const day1 = dd.getDay();
    let d = this.pluscount;
    const day2 = d.getDay();
    

    // for complete saturday and sunday
    var getDateArray = function(start: string | number | Date, end: number  | Date) {
      var arr = new Array();
      var dt = new Date(start);
      while (dt <= end) {
          arr.push((new Date(dt)).toString().substring(0,15)); //save only the Day MMM DD YYYY part
          dt.setDate(dt.getDate() + 1);
      }
      return arr;
  }
  
//   /**
//    * this will prepare a date array
//    */
  var prepareDateArray = function(dtArr: string | any[]) {
      var arr = new Array();
      for (var i = 0; i < dtArr.length; i++) {
          arr.push((new Date(dtArr[i])).toString().substring(0,15)); //save only the Day MMM DD YYYY part
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
            saturdays.push(new Date(year, month, day).getDate());
            // console.log(saturdays.push(new Date(year, month, day).getDate()));
        }
        // date = new Date(year, month, day);
        day += 1;
        date = new Date(year, month, day);
        // console.log(date)
    }
    // console.log(saturdays)
    return saturdays;
}
// i%2!==0 means, it represents 2nd and 4th saturdays
let saturdays = getSaturdays(2021, 5).filter((day, index) => index % 2 !== 0)
console.log(saturdays)


//   /**
//    * this will return an array consisting of the
//    * working dates
//    */
  var getWorkingDateArray = function(dates: any[], hoildayDates: any[], workingWeekendDates: any[]) {
      
//       // remove holidays
      var arr = dates.filter(function(dt: any){
          return holidaysArray.indexOf(dt) < 0;
      });
  
//       // remove weekend dates that are not working dates
      var result = arr.filter(function(dt:any){
        console.log(dt.indexOf("Sat") > -1 || dt.indexOf("Sun") > -1 );
          if (dt.indexOf("Sat") > -1  || dt.indexOf("Sun") > -1 ) {
         
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
  
//   // start and end dates
  var startDate = new Date(this.count); //YYYY-MM-DD
  var endDate = new Date(this.pluscount); //YYYY-MM-DD
  
//   /**
//    * holidays and working weekends
//    *
//    * if not applicable then set it as an empty array
//    * example: if no offical holidays then set
//    * officalHolidays = []
//    * similarly, if no working weekends then set
//    * workingWeekends = []
//    */
  var officalHolidays = ["2022-10-02"]; //YYYY-MM-DD
  var workingWeekends = ["2022-10-05"] //YYYY-MM-DD
  
//   // compute date array between start and end dates
  var dateArray = getDateArray(startDate, endDate);
  
//   // prepare the holidays array
  var holidaysArray = prepareDateArray(officalHolidays);
  
//   // prepare the working weekends array
  var workingWeekendsArray = prepareDateArray(workingWeekends);


//   // get the working days array
  var workingDateArray = getWorkingDateArray(dateArray, holidaysArray, workingWeekendsArray);
  console.log(workingDateArray);
//   // output
// //   for(var i=0;i<workingDateArray.length;i++){
// //     this.countinNumber++;
// // console.log(this.countinNumber);
// //   }
this.countinNumber=workingDateArray.length;
  console.log(workingDateArray.length);


//   function dateDifference(start: string | number, end: string | number) {
//   // Copy date objects so don't modify originals
//   console.log('function started')
//   var s = new Date(dd);
//   var e = new Date(d);
  
//   // Set time to midday to avoid dalight saving and browser quirks
//   s.setHours(12,0,0,0);
//   e.setHours(12,0,0,0);
  
//   // Get the difference in whole days
//   var totalDays = Math.round((e.getDate() - s.getDate()) / 8.64e7);
  
//   // Get the difference in whole weeks
//   var wholeWeeks = totalDays / 7 | 0;
  
//   // Estimate business days as number of whole weeks * 5
//   var days = wholeWeeks * 5;

//   // If not even number of weeks, calc remaining weekend days
//   if (totalDays % 7) {
//     s.setDate(s.getDate() + wholeWeeks * 7);
    
//     while (s < e) {
//       s.setDate(s.getDate() + 1);

//       // If day isn't a Sunday or Saturday, add to business days
//       if (s.getDay() != 0 && s.getDay() != 6) {
//         ++days;
//       }
//     }
//   }
//   console.log(days);
//   return days;
 
// }
    // var dateArr = getDateArray(this.count, this.pluscount);

  //   var getDateArray = function(start: string | number | Date, end: number  | Date) {
  //     var arr = new Array();
  //     var dt = new Date(start);
  //     while (dt <= end) {
  //         arr.push(new Date(dt));
  //         dt.setDate(dt.getDate() + 1);
  //     }
  //     return arr;
  // }
  
  // var dateArr = getDateArray(this.count,this.pluscount);
  
  // // Output
  // console.log("<p>Start Date: " + this.count + "</p>");
  // console.log("<p>End Date: " + this.pluscount + "</p>");
  // console.log("<p>Date Array</p>")
  // for (var i = 0; i < dateArr.length; i++) {
  //     console.log("<p>" + dateArr[i] + "</p>");
  //     if((dateArr[i].getDay()=='Sat')&&(dateArr[i].getDay()=='Sun')){
  //       this.differentdays = Math.ceil(this.difference / (24 * 3600 * 1000)) -1;
  //       console.log(this.difference);
  //     }
  // }

// function nonWorkingDays(date) {

//             var day = date.getDay(), Sunday = 0, Monday = 1, Tuesday = 2, Wednesday = 3, Thursday = 4, Friday = 5, Saturday = 6;
//             var week = 0 | date.getDate() / 7 //get the week
         
//             //check if it's second week or fourth week
//             if (week == 1 || week == 3) {
//                 if (day == 6)  { //check for satruday
//                     return [false];
//                 }
//             }

//             //check for sunday
//             if (day == 0)
//             {
//                 return [false];
//             }
          
// //check for holidays
//             for (i = 0; i < holiday.length; i++) {
//                 if (date.getMonth() == holiday[i][0] - 1 &&
//                 date.getDate() == holiday[i][1] &&
//                 date.getFullYear() == holiday[i][2]) {
//                     return [false];
//                 }
//             }

//             return [true];
//         }






    // var daylist = getDaysArray(d,dd);
    // daylist.map((v:any)=>v.toISOString().slice(0,10)).join("") 
    // console.log(dd) map((v:any)=>v.toISOString().slice(0,10)).join("")
    // this.difference = Math.abs(d - dd);
    // console.log(this.difference);
  
    //   var is_weekend =  (date: any) =>{
    //     var dt = new Date(d);


    //     if(dt.getDay() == 6 || dt.getDay() == 0)
    //        {

    //         this.differentdays=Math.ceil(this.difference/(24*3600*1000))+1
    //         console.log(this.differentdays);
    //         console.log("excluded weekend")

    //         } else{

    //            this.differentdays=Math.ceil(this.difference/(24*3600*1000)-1)
    //     console.log(this.differentdays);
    //     console.log("include weekend")
    //         }
    // }

    // this.differentdays=Math.ceil(this.difference/(24*3600*1000)-1)
    // console.log(this.differentdays);
    // console.log("include weekend")

    // const diffDays = (diffTime / (1000 * 60 * 60 * 24));


    // console.log(this.differentdays);

    // let a=dd.slice(8, 10);
    //    let b= d.slice(8, 10);
    //     console.log(a)
    //     console.log(b)
    //     this.difference =b-a+1;

    //     console.log( this.difference)
    // this.difference=Math.abs(this.count.getTime-this.pluscount.getTime);
    // this.differentdays=Math.ceil(this.difference/(24*3600*1000)) ;
    //var daydiff = diff / (24 * 60 * 60 * 1000)

    // console.log(this.differentdays);
  }
  // var start=this.fromdate;
  // // console.log(start);
  // var end=this.todate;
  // var number=start-end;
  // // console.log(number);
  //   }
  //   const now=new Date();
  //   const year=this.currentdate.getFullYear();
  //   console.log(year);
  //  let month= this.now.getMonth() + 1;
  //  console.log(month);
  //  const day=this.currentdate.getDay();
  //  console.log(day);
  ok() {
    this.modalReference.close();
    this.route.navigate(['/home']);
  }

}


// <input matInput [matDatepickerFilter]="holidayDateFilter" [matDatepicker]="picker">
// holidayDateFilter = (d: Date): boolean => {
//   // check if date is weekend day
//   if (date.getDay() === 0 || date.getDay() === 6) {
//     return true;
//   }

//   // check if date is holiday
//   let d = moment(d);
//   if (this.holidayList) {
//     return !this.holidayList.find(x => {
//       return moment(x).isSame(d, 'day');
//     });
//   }
// };