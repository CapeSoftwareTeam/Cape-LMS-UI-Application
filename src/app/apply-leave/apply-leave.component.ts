import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplyLeave } from '../models/apply-leave.model';
import { ApplyleaveService } from '../services/applyleave.service';

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
  fromdate:any;
  todate:any;
  
  // myDateFilter = (d: Date | null): boolean => {
  //   const day = (d || new Date()).getDay();
  //   return day !== 0 && day !== 6;
  // }
  constructor(private route: Router,
    private apply: ApplyleaveService,
    private fb: FormBuilder,
    private getDetails: ApplyleaveService,
    private activeRoute: ActivatedRoute) { }

  applyLeave = new ApplyLeave();

  postleave !: FormGroup;

  ngOnInit(): void {
    
  this.postleave = new FormGroup({
      leaveType: new FormControl(''),
      noofdays: new FormControl(''),
      fromdate: new FormControl(''),
      todate: new FormControl(''),
      reasonforapply: new FormControl(''),
      status: new FormControl('pending'),
    });
this.getnumber();
    this.empid = sessionStorage.getItem("empid");
    this.getDetails.getInfo(this.empid).subscribe(
      data => {
        this.applyLeave = JSON.parse(data);
      }
    )
  }
  leaveApply() {
    if (this.selectedItem == 'casual') {
      let lastDate = this.applyLeave.approveddate.getMonth;
      let cl = this.applyLeave.casualLeave;
      let presentDate = this.applyLeave.createddate.getMonth;
      if (presentDate == lastDate) {
        console.log("openmodal popup and say no casual leave is available");
      }
    }

    this.applyLeave.leaveType = this.postleave.value.leaveType;
    this.applyLeave.noofdays = this.postleave.value.noofdays;
    this.applyLeave.fromdate = this.postleave.value.fromdate;
    this.applyLeave.todate = this.postleave.value.todate;
    this.applyLeave.reasonforapply = this.postleave.value.reasonforapply;
    this.applyLeave.status = this.postleave.value.status;
    this.apply.leaveRegister(this.applyLeave).subscribe(
      data => { this.leave.push(this.postleave) }
    )

    console.log("applied")
  }
  cancel() {
    this.route.navigate(['/home']);
  }
  selected() {
    console.log(this.selectedItem);
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
  count:any;
  pluscount:any;
  difference:any;
  differentdays:any;;
  getfirstnumber(){
    // console.log(date1);
   this.count=this.fromdate; 
   console.log(this.count);
  }
  getsecondnumber(){
    this.pluscount=this.todate;
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
let dd=this.count;

let d=this.pluscount;

// console.log(dd)
    this.difference=Math.abs(d-dd);
    console.log(this.difference)
    // const diffDays = (diffTime / (1000 * 60 * 60 * 24));
   this.differentdays=Math.ceil(this.difference/(24*3600*1000))
console.log(this.differentdays);

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