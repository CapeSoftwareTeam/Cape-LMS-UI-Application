import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { end, start } from '@popperjs/core';
import { ApplyLeave } from '../models/apply-leave.model';
import { LeaveTracking } from '../models/leave-tracking.model';
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
  findHalfToDays:any;
  findHalfDays:any;
  findDays:any;
  historyid:any;
  minus:any=0.5;
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
    return day !== 0 ;
  }
  TomyDateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 ;
  }
  modalReference: any;
  countinNumber: any;
  personDetails = new Register();
  leavetrack=new LeaveTracking();
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
  fulldays: any;
  halfdays: any;
  cl: any;
  saturdays1: any=[];


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
      leaveType: new FormControl('',Validators.required),
      noofdays: new FormControl('',Validators.required),
      fromdate: new FormControl('',Validators.required),
      chooseDays:new FormControl('',Validators.required),
      chooseFromDays:new FormControl('',Validators.required),
      chooseToDays:new FormControl('',Validators.required),
      todate: new FormControl('',Validators.required),
      reasonforapply: new FormControl('',Validators.required),
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
  leaveApply(success: any,failure:any) {

    if(this.postleave.invalid){
      return ;
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

    this.apply.LeaveTrackPopUpdetails(this.empid).subscribe(
      data=>{
       this.leavetrack=JSON.parse(data);

       
        if(this.postleave.value.leaveType=="casual"){      
          // if(this.leavetrack.carryForwardLeave==undefined ){
          //   this.leavetrack.carryForwardLeave=0.0;
          //   this.modalReference = this.modalService.open(failure, { size: 'm' });
           if(this.countinNumber>this.leavetrack.carryForwardLeave ||this.leavetrack.carryForwardLeave==undefined){
            this.modalReference = this.modalService.open(failure, { size: 'm' });
           }
          else{
            this.apply.leaveRegister(this.applyLeave).subscribe(
              data => { this.leave.push(this.applyLeave) }
            )
            this.modalReference = this.modalService.open(success, { size: 'm' })
            console.log("applied")
           }
        
      }
        else if(this.postleave.value.leaveType=="sick"){
          if(this.countinNumber>this.leavetrack.sickLeave){
            this.modalReference = this.modalService.open(failure, { size: 'm' });
           }else{
            this.apply.leaveRegister(this.applyLeave).subscribe(
              data => { this.leave.push(this.applyLeave) }
            )
            this.modalReference = this.modalService.open(success, { size: 'm' })
            console.log("applied")
        }
    
      }
      else if(this.postleave.value.leaveType=="bereavement"){
        if(this.countinNumber>this.leavetrack.bereavementLeave){
          this.modalReference = this.modalService.open(failure, { size: 'm' });
         }else{
          this.apply.leaveRegister(this.applyLeave).subscribe(
            data => { this.leave.push(this.applyLeave) }
          )
          this.modalReference = this.modalService.open(success, { size: 'm' })
          console.log("applied")
      }
  
    }
    else if(this.postleave.value.leaveType=="privilege"){
      if(this.countinNumber>this.leavetrack.privilegeLeave){
        this.modalReference = this.modalService.open(failure, { size: 'm' });
       }else{
        this.apply.leaveRegister(this.applyLeave).subscribe(
          data => { this.leave.push(this.applyLeave) }
        )
        this.modalReference = this.modalService.open(success, { size: 'm' })
        console.log("applied")
    }

  }
  else if(this.postleave.value.leaveType=="maternity"){
    if(this.countinNumber>this.leavetrack.maternityLeave){
      this.modalReference = this.modalService.open(failure, { size: 'm' });
     }else{
      this.apply.leaveRegister(this.applyLeave).subscribe(
        data => { this.leave.push(this.applyLeave) }
      )
      this.modalReference = this.modalService.open(success, { size: 'm' })
      console.log("applied")
  }

}
     })

   
    // this.apply.leaveRegister(this.applyLeave).subscribe(
    //   data => { this.leave.push(this.applyLeave) }
    // )
    // this.modalReference = this.modalService.open(success, { size: 'm' })
    // console.log("applied")
  }
  
  selected() {
    console.log(this.selectedItem);
  }
  save() {
    if(this.postleave.invalid){
      return ;
    }
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
  proceed(){
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
    this.applyLeave.status = 'pending';
    this.apply.leaveRegister(this.applyLeave).subscribe(
      data => { this.leave.push(this.postleave) }
    )
    this.route.navigate(['/home']);
    this.modalReference.close();
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
        this.saturdays=[];
        this.thismonth = this.count.getMonth(); this.nextmonth = this.pluscount.getMonth();
        this.thisyear = this.count.getFullYear(); this.nextyear = this.pluscount.getFullYear();
        this.saturdays= getSaturdays(this.thisyear, this.thismonth).filter((day, index) => index % 2 == 0);
        console.log(this.saturdays)
        for (let r = 0; r < this.saturdays.length; r++) {

          let tempDate = this.saturdays[r].getMonth() + 1;
          this.Alternatesaturday.push(this.saturdays[r].getFullYear() + "-" + tempDate + "-" + this.saturdays[r].getDate()) + 1
        }
        console.log(this.Alternatesaturday);
      }
      else if ((this.count.getFullYear() != this.pluscount.getFullYear()) || this.count.getMonth() != this.pluscount.getMonth()) {
        this.Alternatesaturday = [];
        this.saturdays=[];
        this.thismonth = this.count.getMonth(); this.nextmonth = this.pluscount.getMonth();
        this.thisyear = this.count.getFullYear(); this.nextyear = this.pluscount.getFullYear();
        // if(this.saturdays.getMonth()== this.count.getMonth()){
        this.saturdays=getSaturdays(this.thisyear, this.thismonth).filter((day, index) => index % 2 == 0);
        // }
        // if(this.saturdays.getMonth()== this.pluscount.getMonth()){
        this.saturdays1=(getSaturdays(this.nextyear, this.nextmonth).filter((day, index) => index % 2 == 0));
        // }
        this.saturdays= this.saturdays.concat(this.saturdays1);
        console.log(this.saturdays)
        for (let r = 0; r < this.saturdays.length; r++) {
          let tempDate = this.saturdays[r].getMonth() + 1;
          this.Alternatesaturday.push(this.saturdays[r].getFullYear() + "-" + tempDate + "-" + this.saturdays[r].getDate())+1;
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
      if(workingDateArray.length==0){
        this.countinNumber=0
      }

    if(this.postleave.value.chooseDays=="HalfDay"){
    
      if(this.count!=(this.pluscount) ||this.count==(this.pluscount)){
// if(this.count!=this.pluscount){
if(workingDateArray.length==0){
        this.countinNumber=0
      }
else if(this.postleave.value.chooseFromDays=="morningfromHalf"&& this.postleave.value.chooseFromDays=="afternoontoHalf"||
this.postleave.value.chooseFromDays=="afternoonfromHalf"&& this.postleave.value.chooseFromDays=="morningtoHalf"){
let number=workingDateArray.length-this.minus;
this.countinNumber = number-this.minus;
}else{
this.countinNumber = workingDateArray.length-this.minus;
// console.log("no either or is here"+this.countinNumber);
}
//  if(this.postleave.value.chooseFromDays=="afternoonfromHalf"&& this.postleave.value.chooseFromDays =="tofull"
//  ||this.postleave.value.chooseFromDays=="afternoontoHalf" && this.postleave.value.chooseFromDays =="fromfull"||
//  this.postleave.value.chooseFromDays=="morningfromHalf" && this.postleave.value.chooseFromDays =="tofull"||
//   this.postleave.value.chooseFromDays=="morningtoHalf" &&this.postleave.value.chooseFromDays =="fromfull")

      }
// if((frommrng!=null && fromevng!=null) || (toevng!=null && tomrng!=null))
// {
// document.getElementsByName("fromdate").forEach(radio=>{if(radio.checked){console.log(radio.value)}})

// console.log("half either or is here"+this.countinNumber);
// }else 
//   if((frommrng!= null && tomrng!= null)||(frommrng!= null && toevng!= null)||(toevng!= null&& frommrng!= null) ){
//     let number=workingDateArray.length-this.minus;
//     this.countinNumber = number-this.minus;

//   // }
// }
// }
// else{
//   if(this.count== this.pluscount){
//   if(this.postleave.value.chooseFromDays=="morningfromHalf"&& this.postleave.value.chooseFromDays=="afternoonfromHalf"||
//   this.postleave.value.chooseFromDays=="afternoontoHalf"|| this.postleave.value.chooseFromDays=="morningtoHalf"){
//   this.countinNumber = workingDateArray.length-this.minus;
// }
// }
// }
// else if(this.postleave.value.chooseFromDays=="morningfromHalf"&& this.postleave.value.chooseFromDays=="afternoontoHalf"||
// this.postleave.value.chooseFromDays=="afternoonfromHalf"&& this.postleave.value.chooseFromDays=="morningtoHalf"){
// if((frommrng!= null && tomrng!= null)||(frommrng!= null && toevng!= null)||(toevng!= null&& frommrng!= null)){

// }else{
//   this.countinNumber = workingDateArray.length-this.minus;
//   console.log(this.countinNumber);
// }

// } 
}
  //  }
  
if(this.postleave.value.chooseDays=="FullDay"){ 
// if(this.fulldays){
if(this.count!=(this.pluscount) ||this.count==(this.pluscount)){
this.countinNumber = workingDateArray.length;
}
}

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

      // this.countinNumber = workingDateArray.length;
      // var rates = document.getElementById('frommrng').value;
      // var full = document.querySelector('input[name="full"]:checked');
      // var half = document.querySelector('input[name="half"]:checked');
      //  var frommrng = document.querySelectorAll('input[name="frommrng"]:checked');
      //  var fromevng = document.querySelectorAll('input[name="fromevng"]:checked');
      //  var tomrng = document.querySelectorAll('input[name="tomrng"]:checked');
      //  var toevng = document.querySelectorAll('input[name="toevng"]:checked');
  // let daysradioBtns=document.querySelectorAll("input[name='datefirst']");
          // let findSelected=()=>{
          //   let Dselected=document.querySelector("input[name='']:checked");
          //   // let fselected=document.querySelector("input[name='fromdate']:checked");
          //   // let
          //   console.log(Dselected);
          // }
          // daysradioBtns.forEach(daysbtn=>{
          //   daysbtn.addEventListener("change",findSelected)
          // });
          if(workingDateArray.length==0){
            this.countinNumber=0
          }

        if(this.postleave.value.chooseDays=="HalfDay"){
        
          if(this.count!=(this.pluscount) ||this.count==(this.pluscount)){
// if(this.count!=this.pluscount){
  if(workingDateArray.length==0){
            this.countinNumber=0
          }
 else if(this.postleave.value.chooseFromDays=="morningfromHalf"&& this.postleave.value.chooseFromDays=="afternoontoHalf"||
this.postleave.value.chooseFromDays=="afternoonfromHalf"&& this.postleave.value.chooseFromDays=="morningtoHalf"){
  let number=workingDateArray.length-this.minus;
  this.countinNumber = number-this.minus;
}else{
  this.countinNumber = workingDateArray.length-this.minus;
  // console.log("no either or is here"+this.countinNumber);
}
//  if(this.postleave.value.chooseFromDays=="afternoonfromHalf"&& this.postleave.value.chooseFromDays =="tofull"
//  ||this.postleave.value.chooseFromDays=="afternoontoHalf" && this.postleave.value.chooseFromDays =="fromfull"||
//  this.postleave.value.chooseFromDays=="morningfromHalf" && this.postleave.value.chooseFromDays =="tofull"||
//   this.postleave.value.chooseFromDays=="morningtoHalf" &&this.postleave.value.chooseFromDays =="fromfull")
    
          }
  // if((frommrng!=null && fromevng!=null) || (toevng!=null && tomrng!=null))
  // {
    // document.getElementsByName("fromdate").forEach(radio=>{if(radio.checked){console.log(radio.value)}})
 
    // console.log("half either or is here"+this.countinNumber);
  // }else 
  //   if((frommrng!= null && tomrng!= null)||(frommrng!= null && toevng!= null)||(toevng!= null&& frommrng!= null) ){
  //     let number=workingDateArray.length-this.minus;
  //     this.countinNumber = number-this.minus;
  
  //   // }
  // }
// }
// else{
//   if(this.count== this.pluscount){
//   if(this.postleave.value.chooseFromDays=="morningfromHalf"&& this.postleave.value.chooseFromDays=="afternoonfromHalf"||
//   this.postleave.value.chooseFromDays=="afternoontoHalf"|| this.postleave.value.chooseFromDays=="morningtoHalf"){
//   this.countinNumber = workingDateArray.length-this.minus;
// }
// }
// }
// else if(this.postleave.value.chooseFromDays=="morningfromHalf"&& this.postleave.value.chooseFromDays=="afternoontoHalf"||
// this.postleave.value.chooseFromDays=="afternoonfromHalf"&& this.postleave.value.chooseFromDays=="morningtoHalf"){
 // if((frommrng!= null && tomrng!= null)||(frommrng!= null && toevng!= null)||(toevng!= null&& frommrng!= null)){
 
  // }else{
  //   this.countinNumber = workingDateArray.length-this.minus;
  //   console.log(this.countinNumber);
  // }

// } 
}
      //  }
      
if(this.postleave.value.chooseDays=="FullDay"){ 
// if(this.fulldays){
  if(this.count!=(this.pluscount) ||this.count==(this.pluscount)){
    this.countinNumber = workingDateArray.length;
  }
}

    }
  }
  handlerFull(event:any){
    this.fulldays=event.target.value;
    console.log(this.fulldays);
  }
  handlerHalf(event:any){
    this.halfdays=event.target.value;
  }
  ok() {
    this.modalReference.close();
    this.route.navigate(['/home']);
  }
  cancel(){
    this.registerDetails.deleteHistory(this.historyid).subscribe(
      data=>{
        this.ngOnInit();
        console.log("data for delete is passed");
      
      }
      
    )
    this.modalReference.close();
   
  }
  hideDays() {
    this.showMorning = false;
  }
  showDays() {
    this.showMorning = true;
  }
  pageNavigate(){
    this.route.navigate(["/home"])
  }

}
