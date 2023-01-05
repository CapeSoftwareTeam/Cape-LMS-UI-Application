import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { end, start } from '@popperjs/core';
import { GlobalErrorHandlerService } from '../services/global-error-handler.service';
import { ApplyLeave } from '../models/apply-leave.model';
import { LeaveTracking } from '../models/leave-tracking.model';
import { Register } from '../models/register';
import { ApplyleaveService } from '../services/applyleave.service';
import { HolidayservicesService } from '../services/holidayservices.service';
import { LeaveStatusServiceService } from '../services/leave-status-service.service';
import { RegisterserviceService } from '../services/registerservice.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {
  submitted:boolean=false;
  showGetNumberfullError:boolean=false;
  noMatchGender:boolean=false;
  b:any=[];
  enddatehalf:any;
  showGetNumberError:boolean=false;
  hideIfnotme: boolean = true;
  defaultEmpid: any = '';
  hideIfsick: boolean = true;
  findHalfToDays: any;
  findHalfDays: any;
  findDays: any;
  historyid!: number;
  minus: any = 0.5;
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
  msg:boolean=false;
  msg1:boolean=false;
  FrommyDateFilter:any;
  TomyDateFilter:any;
  modalReference: any;
  countinNumber: any;
  personDetails = new Register();
  leavetrack = new LeaveTracking();
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
  saturdays1: any = [];
  leftoverApproval: any = [];
  members: any = [];
  city: any;
  selectedEmployee: any;
  Selectedname: any;
  selectedEmpid: any;
  selectedName: any;
  selectedexperience: any;
  selectedlocation: any;
  personDetailbsd: any = [];
  personname: any;
  persondepartment: any;
  persondesignation: any;
  personlocation: any;
  personexperience: any;
  personmanagername: any;
  personmanageremail: any;
  detailsdata: any=[];
  showErrorMessage: boolean=false;
  errorMessage: string='';
  status:any
  persongender: any;
  personMartialstatus: any;
  count: any;
  pluscount: any;
  difference: any;
  differentdays: any;
  statusreview: any;

  constructor(private route: Router,
              private apply: ApplyleaveService,
              private fb: FormBuilder,
              private modalService: NgbModal,
              private registerDetails: LeaveStatusServiceService,
              private getPublicHolidays: HolidayservicesService,
              private teamdetails: RegisterserviceService,
              private statusagree: LeaveStatusServiceService,
              private globalErrorHandler: GlobalErrorHandlerService,
              private dialogRef: MatDialogRef<ApplyLeaveComponent>) { }

  applyLeave = new ApplyLeave();

  postleave !: FormGroup;

ngOnInit(): void {

  this.postleave = new FormGroup({
    empid:new FormControl('', Validators.required),

    leaveType: new FormControl('', Validators.required),
    noofdays: new FormControl('', Validators.required),
    fromdate: new FormControl('', Validators.required),
    chooseDays: new FormControl('', Validators.required),
    chooseFromDays: new FormControl('', Validators.required),
    chooseToDays: new FormControl('', Validators.required),
    todate: new FormControl('', Validators.required),
    reasonforapply: new FormControl('', Validators.required),
    status: new FormControl('pending'),
  });

    this.empid = sessionStorage.getItem("empid");
    this.getPublicHolidays.getLeave().subscribe(
      data => {
        let temp = [];
        this.Includepublicholiday = JSON.parse(data);
        for (let leave of this.Includepublicholiday) {
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
        this.manageremail = this.personDetails.manageremail;
        this.city = this.personDetails.city;
        this.statusreview=this.personDetails.status;
        if(this.department=="Software"){
          this.FrommyDateFilter = (d: Date | null): boolean => {
            const day = (d || new Date()).getDay();
            return day !== 0 && day !== 6;
          }
          this.TomyDateFilter = (d: Date | null): boolean => {
            const day = (d || new Date()).getDay();
            return day !== 0 && day !== 6;
          }
        }else if(this.department!="Software"){
          this.FrommyDateFilter = (d: Date | null): boolean => {
            const day = (d || new Date()).getDay();
            return day !== 0;
          }
          this.TomyDateFilter = (d: Date | null): boolean => {
            const day = (d || new Date()).getDay();
            return day !== 0;
          }
        }
      }
    )

    this.getPublicHolidays.getLeave().subscribe(
      data => {
        this.Includepublicholiday = JSON.parse(data);
        console.log(this.Includepublicholiday);
        for (let e = 0; e <= this.Includepublicholiday; e++) {
          this.holidays = this.Includepublicholiday.date;
          console.log(this.holidays);
        }
      }, error=>{
        this.showErrorMessage=true;
        this.errorMessage=this.globalErrorHandler.errorMessage;
          setTimeout(() => {
            this.showErrorMessage=false;
          }, 3000);
      }
    );

    this.registerDetails.getMemberDetails(this.empid).subscribe(
      data => {
        this.applyLeave = JSON.parse(data);
      },error=>{
          this.showErrorMessage=true;
          this.errorMessage=this.globalErrorHandler.errorMessage;
            setTimeout(() => {
              this.showErrorMessage=false;
            }, 3000);
        }
    )

    this.teamdetails.getEmpid().subscribe(
      data => {
        this.leftoverApproval = JSON.parse(data)
          for (let team of this.leftoverApproval) {
            if(this.designation=="Manager" && this.statusreview=="Active"){
              if (team.managername == this.name && team.department == this.department && team.city == this.city) {
                this.members.push(team);
              }
            }
            else if(this.designation=="HR" && this.statusreview=="Active"){
              if (team.managername == this.name && team.designation == "Manager") {
                this.members.push(team);
              }
            }
         }
      },error=>{
          this.showErrorMessage=true;
          this.errorMessage=this.globalErrorHandler.errorMessage;
            setTimeout(() => {
             this.showErrorMessage=false;
            }, 3000);
        }
    );
}

  leaveApply(success: any, failure: any,onbehalf:any) {
    this.submitted=true;
    if(this.field.chooseDays.value==undefined ||this.postleave.value.fromdate==undefined ||this.postleave.value.todate==undefined ||this.countinNumber==undefined||this.countinNumber==undefined ||this.postleave.value.reasonforapply=="" ){
      this.msg=true;
      
      setTimeout(() => {
        this.msg=false;
      }, 3000);
      return
      
      
          }
   
    
    // if(this.postleave.invalid){
    //   return ;
    // }
    if ((this.defaultEmpid != this.empid)) {
      this.applyLeave.empid = this.defaultEmpid;
      this.applyLeave.name = this.personname;
      this.applyLeave.department = this.persondepartment;
      this.applyLeave.designation = this.persondesignation;
      this.applyLeave.experience = this.personexperience;
      this.applyLeave.location = this.personlocation;
      this.applyLeave.managername = this.personmanagername;
      this.applyLeave.manageremail = this.personmanageremail;
      this.applyLeave.leaveType = this.postleave.value.leaveType;
      this.applyLeave.noofdays = this.countinNumber;
      this.applyLeave.fromdate = this.postleave.value.fromdate;
      this.applyLeave.todate = this.postleave.value.todate;
      this.applyLeave.reasonforapply = this.postleave.value.reasonforapply;
      this.applyLeave.status = 'pending';
        this.apply.leaveRegister(this.applyLeave).subscribe(
          data => { },error=>{
                       this.showErrorMessage=true;
                       this.errorMessage=this.globalErrorHandler.errorMessage;
                        setTimeout(() => {
                          this.showErrorMessage=false;
                        }, 3000);
                      }
        )
      this.modalReference=this.modalService.open(onbehalf,{ size: 'm' })
    }
    else {
      this.applyLeave.empid = this.empid;
      this.applyLeave.name = this.name;
      this.applyLeave.department = this.department;
      this.applyLeave.designation = this.designation;
      this.applyLeave.experience = this.experience;
      this.applyLeave.location = this.location;
      this.applyLeave.managername = this.managername;
      this.applyLeave.manageremail = this.manageremail;
      this.applyLeave.leaveType = this.postleave.value.leaveType;
      this.applyLeave.noofdays = this.countinNumber;
      this.applyLeave.fromdate = this.postleave.value.fromdate;
      this.applyLeave.todate = this.postleave.value.todate;
      this.applyLeave.reasonforapply = this.postleave.value.reasonforapply;
      this.applyLeave.status = 'pending';
      // this.apply.leaveRegister(this.applyLeave).subscribe(
      // data => { this.leave.push(this.postleave) }
      // )
        this.apply.LeaveTrackPopUpdetails(this.empid).subscribe(
          data => {
            this.leavetrack = JSON.parse(data);
              if (this.postleave.value.leaveType == "casual" ) {
                if (this.countinNumber > this.leavetrack.carryForwardLeave || this.leavetrack.carryForwardLeave == undefined) {
                  this.modalReference = this.modalService.open(failure, { size: 'm' });
                }
                else{
                  if(this.designation=="HR"){
                    this.apply.leaveRegister(this.applyLeave).subscribe(
                      data => { this.leave.push(this.applyLeave) }
                    )
                    this.modalReference = this.modalService.open(onbehalf, { size: 'm' })
                  }else{
                    this.apply.leaveRegister(this.applyLeave).subscribe(
                      data => { this.leave.push(this.applyLeave) }
                    )
                    this.modalReference = this.modalService.open(success, { size: 'm' })
                  }
               
                }
              }
              else if (this.postleave.value.leaveType == "sick") {
                if (this.countinNumber > this.leavetrack.sickLeave) {
                  this.modalReference = this.modalService.open(failure, { size: 'm' });
                } 
                else{
                  if(this.designation=="HR"){
                    this.apply.leaveRegister(this.applyLeave).subscribe(
                      data => { this.leave.push(this.applyLeave) }
                    )
                    this.modalReference = this.modalService.open(onbehalf, { size: 'm' })
                  }else{
                    this.apply.leaveRegister(this.applyLeave).subscribe(
                      data => { this.leave.push(this.applyLeave) }
                    )
                    this.modalReference = this.modalService.open(success, { size: 'm' })
                  }
               
                }
              }
              else if (this.postleave.value.leaveType == "bereavement") {
                if (this.countinNumber > this.leavetrack.bereavementLeave) {
                  this.modalReference = this.modalService.open(failure, { size: 'm' });
                }
                else{
                  if(this.designation=="HR"){
                    this.apply.leaveRegister(this.applyLeave).subscribe(
                      data => { this.leave.push(this.applyLeave) }
                    )
                    this.modalReference = this.modalService.open(onbehalf, { size: 'm' })
                  }else{
                    this.apply.leaveRegister(this.applyLeave).subscribe(
                      data => { this.leave.push(this.applyLeave) }
                    )
                    this.modalReference = this.modalService.open(success, { size: 'm' })
                  }
               
                }
              }
              else if (this.postleave.value.leaveType == "privilege") {
                if (this.countinNumber > this.leavetrack.privilegeLeave) {
                  this.modalReference = this.modalService.open(failure, { size: 'm' });
                }
                else{
                  if(this.designation=="HR"){
                    this.apply.leaveRegister(this.applyLeave).subscribe(
                      data => { this.leave.push(this.applyLeave) }
                    )
                    this.modalReference = this.modalService.open(onbehalf, { size: 'm' })
                  }else{
                    this.apply.leaveRegister(this.applyLeave).subscribe(
                      data => { this.leave.push(this.applyLeave) }
                    )
                    this.modalReference = this.modalService.open(success, { size: 'm' })
                  }
               
                }

              }
              else if (this.postleave.value.leaveType == "maternity") {
                if (this.countinNumber > this.leavetrack.maternityLeave) {
                  this.modalReference = this.modalService.open(failure, { size: 'm' });
                }
                else{
                  if(this.designation=="HR"){
                    this.apply.leaveRegister(this.applyLeave).subscribe(
                      data => { this.leave.push(this.applyLeave) }
                    )
                    this.modalReference = this.modalService.open(onbehalf, { size: 'm' })
                  }else{
                    this.apply.leaveRegister(this.applyLeave).subscribe(
                      data => { this.leave.push(this.applyLeave) }
                    )
                    this.modalReference = this.modalService.open(success, { size: 'm' })
                  }
               
                }

              }

          },error=>{
            this.showErrorMessage=true;
            this.errorMessage=this.globalErrorHandler.errorMessage;
              setTimeout(() => {this.showErrorMessage=false;},3000);
            }
        )  
    }
  }


  Save(save:any,successave:any) {
    this.submitted=true;
    if(this.field.chooseDays.value==undefined ||this.postleave.value.fromdate==undefined ||this.postleave.value.todate==undefined ||this.countinNumber==undefined ||this.postleave.value.reasonforapply==""){
      this.msg=true;
      
      setTimeout(() => {
        this.msg=false;
      }, 3000);
      return
          }
          
    // if(this.postleave.invalid){
    //   return ;
    // }
    this.applyLeave.empid = this.empid;
    this.applyLeave.name = this.name;
    this.applyLeave.department = this.department;
    this.applyLeave.designation = this.designation;
    this.applyLeave.experience = this.experience;
    this.applyLeave.location = this.location;
    this.applyLeave.managername = this.managername;
    this.applyLeave.manageremail = this.manageremail;
    this.applyLeave.leaveType = this.postleave.value.leaveType;
    this.applyLeave.noofdays = this.countinNumber;
    this.applyLeave.fromdate = this.postleave.value.fromdate;
    this.applyLeave.todate = this.postleave.value.todate;
    this.applyLeave.reasonforapply = this.postleave.value.reasonforapply;
    this.applyLeave.status = 'not submitted';

    this.apply.leaveRegister(this.applyLeave).subscribe(data => {this.leave.push(this.postleave)})    
      this.apply.LeaveTrackPopUpdetails(this.empid).subscribe(
        data => {
          this.leavetrack = JSON.parse(data);
            if (this.postleave.value.leaveType == "casual") {
              if (this.countinNumber > this.leavetrack.carryForwardLeave || this.leavetrack.carryForwardLeave == undefined) {
                this.modalReference = this.modalService.open(save, { size: 'm' });
              }else{
                this.modalReference=this.modalService.open(successave, { size: 'm' })
              }
            }
            else if (this.postleave.value.leaveType == "sick") {
              if (this.countinNumber > this.leavetrack.sickLeave) {
                this.modalReference = this.modalService.open(save, { size: 'm' });
              }else{
                this.modalReference=this.modalService.open(successave, { size: 'm' })
              }
            }
          else if (this.postleave.value.leaveType == "bereavement") {
            if (this.countinNumber > this.leavetrack.bereavementLeave) {
              this.modalReference = this.modalService.open(save, { size: 'm' });
            }
            else{
              this.modalReference=this.modalService.open(successave, { size: 'm' })
            }
          }
          else if (this.postleave.value.leaveType == "privilege") {
            if (this.countinNumber > this.leavetrack.privilegeLeave) {
              this.modalReference = this.modalService.open(save, { size: 'm' });
            }
            else{
              this.modalReference=this.modalService.open(successave, { size: 'm' })
            }
          }
          else if (this.postleave.value.leaveType == "maternity") {
            if (this.countinNumber > this.leavetrack.maternityLeave) {
              this.modalReference = this.modalService.open(save, { size: 'm' });
            }
            else{
              this.modalReference=this.modalService.open(successave, { size: 'm' })
            }
          }
        },error=>{
          this.showErrorMessage=true;
          this.errorMessage=this.globalErrorHandler.errorMessage;
            setTimeout(() => {this.showErrorMessage=false;}, 3000);
        })
      
  }

  proceed() {
    if (this.defaultEmpid == this.empid) {
      this.applyLeave.empid = this.empid;
      this.applyLeave.name = this.name;
      this.applyLeave.department = this.department;
      this.applyLeave.designation = this.designation;
      this.applyLeave.experience = this.experience;
      this.applyLeave.location = this.location;
      this.applyLeave.managername = this.managername;
      this.applyLeave.manageremail = this.manageremail;
      this.applyLeave.leaveType = this.postleave.value.leaveType;
      this.applyLeave.noofdays = this.countinNumber;
      this.applyLeave.fromdate = this.postleave.value.fromdate;
      this.applyLeave.todate = this.postleave.value.todate;
      this.applyLeave.reasonforapply = this.postleave.value.reasonforapply;
      if(this.designation=="HR")
      {this.applyLeave.status = 'Approved'}
      else{ this.applyLeave.status = 'pending';}
      this.apply.leaveRegister(this.applyLeave).subscribe(
        data => { this.leave.push(this.postleave) }
      )
    }else {
      this.applyLeave.empid = this.selectedEmpid;
      this.applyLeave.name = this.personname;
      this.applyLeave.department = this.persondepartment;
      this.applyLeave.designation = this.persondesignation;
      this.applyLeave.experience = this.personexperience;
      this.applyLeave.location = this.personlocation;
      this.applyLeave.managername = this.personmanagername;
      this.applyLeave.manageremail = this.personmanageremail;
      this.applyLeave.leaveType = this.postleave.value.leaveType;
      this.applyLeave.noofdays = this.countinNumber;
      this.applyLeave.fromdate = this.postleave.value.fromdate;
      this.applyLeave.todate = this.postleave.value.todate;
      this.applyLeave.reasonforapply = this.postleave.value.reasonforapply;
      this.applyLeave.status = 'pending';
      this.apply.leaveRegister(this.applyLeave).subscribe(
        data => { this.leave.push(this.postleave) }
      ) 

    }
    this.dialogRef.close();
    // this.route.navigate(['/home']);
    this.modalReference.close();
  }

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
           // for complete saturday and sunday
           var getDateArray = function (start: string | number | Date, end: number | Date) {
           var arr = new Array();
           var dt = new Date(start);
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
          if(date.getDay() === 6) { // Sun=0, Mon=1, Tue=2, etc.
            saturdays.push(new Date(year, month, day));
          }
          day += 1;
          date = new Date(year, month, day);
        }
        return saturdays;
    }
        if (this.count.getMonth() == this.pluscount.getMonth() && this.count.getFullYear() == this.pluscount.getFullYear()) {
          this.saturdays = [];
          this.thismonth = this.count.getMonth(); this.nextmonth = this.pluscount.getMonth();
          this.thisyear = this.count.getFullYear(); this.nextyear = this.pluscount.getFullYear();
          this.saturdays = getSaturdays(this.thisyear, this.thismonth).filter((day, index) => index % 2 == 0);
            for (let r = 0; r < this.saturdays.length; r++) {
              let tempDate = this.saturdays[r].getMonth() + 1;
              this.Alternatesaturday.push(this.saturdays[r].getFullYear() + "-" + tempDate + "-" + this.saturdays[r].getDate()) + 1
            }
        }
        else if ((this.count.getFullYear() != this.pluscount.getFullYear()) || this.count.getMonth() != this.pluscount.getMonth()) {
          this.Alternatesaturday = [];
          this.saturdays = [];
          this.thismonth = this.count.getMonth(); this.nextmonth = this.pluscount.getMonth();
          this.thisyear = this.count.getFullYear(); this.nextyear = this.pluscount.getFullYear();
          // if(this.saturdays.getMonth()== this.count.getMonth()){
          this.saturdays = getSaturdays(this.thisyear, this.thismonth).filter((day, index) => index % 2 == 0);
          // }
          // if(this.saturdays.getMonth()== this.pluscount.getMonth()){
          this.saturdays1 = (getSaturdays(this.nextyear, this.nextmonth).filter((day, index) => index % 2 == 0));
          // }
          this.saturdays = this.saturdays.concat(this.saturdays1);
            for (let r = 0; r < this.saturdays.length; r++) {
              let tempDate = this.saturdays[r].getMonth() + 1;
              this.Alternatesaturday.push(this.saturdays[r].getFullYear() + "-" + tempDate + "-" + this.saturdays[r].getDate()) + 1;
            }
        }
        var getWorkingDateArray = function (dates: any[], hoildayDates: any[], workingWeekendDates: any[]) {
        var arr = dates.filter(function (dt: any) {
          return holidaysArray.indexOf(dt) < 0;
        });
        var result = arr.filter(function (dt: any) {
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
      var dateArray = getDateArray(startDate, endDate);
      var holidaysArray = prepareDateArray(officalHolidays);
      var workingWeekendsArray = prepareDateArray(workingWeekends);
      var workingDateArray = getWorkingDateArray(dateArray, holidaysArray, workingWeekendsArray);
        this.countinNumber = workingDateArray.length;
          if (workingDateArray.length == 0) {
            this.countinNumber = 0
          }
          if (this.postleave.value.chooseDays == "HalfDay") {
            
            if (this.count.toDateString() != (this.pluscount.toDateString())) {
              if(this.postleave.value.chooseFromDays =="fromfull" && this.postleave.value.chooseToDays=="tofull"){
                this.showGetNumberfullError=true;
                setTimeout(() => { this.showGetNumberfullError=false;}, 3000);
               
              }
            // if(this.count!=this.pluscount){
              if (workingDateArray.length == 0) {
                this.countinNumber = 0
              }
            else if(this.postleave.value.chooseFromDays == "morningfromHalf"&& this.postleave.value.chooseToDays == "morningtoHalf"
                 || this.postleave.value.chooseFromDays == "afternoonfromHalf" && this.postleave.value.chooseToDays == "afternoontoHalf"){
              let number = workingDateArray.length - this.minus;
              this.countinNumber = number - this.minus;
            }
            else if (this.postleave.value.chooseFromDays == "morningfromHalf" && this.postleave.value.chooseToDays == "afternoontoHalf" ||
              this.postleave.value.chooseFromDays == "afternoonfromHalf" && this.postleave.value.chooseToDays == "morningtoHalf") {
                let number = workingDateArray.length - this.minus;
                this.countinNumber = number - this.minus;
            }else {
              this.countinNumber = workingDateArray.length - this.minus;
            }
            }
            else if(this.count.toDateString() == (this.pluscount.toDateString())){
              if(this.postleave.value.chooseFromDays == "morningfromHalf" && this.postleave.value.chooseToDays == "morningtoHalf"
                  || this.postleave.value.chooseFromDays == "afternoonfromHalf" && this.postleave.value.chooseToDays == "afternoontoHalf"){
                this.countinNumber = workingDateArray.length - this.minus;
              }else{
                this.countinNumber = workingDateArray.length - this.minus; 
              }
            }
          } 
          if (this.postleave.value.chooseDays == "FullDay") {
            if (this.count != (this.pluscount) || this.count == (this.pluscount)) {
              this.countinNumber = workingDateArray.length;
            }
          }
          if(this.countinNumber==0){
            this.showGetNumberError=true;
            setTimeout(() => {this.showGetNumberError=false;}, 3000);
          }
        }
        if (this.department == 'Software') {
          var getDateArray = function (start: string | number | Date, end: number | Date) {
          var arr = new Array();
          var dt = new Date(start);
            while (dt <= end) {
              arr.push((new Date(dt)).toString().substring(0, 15)); //save only the Day MMM DD YYYY part
              dt.setDate(dt.getDate() + 1);
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
          }
          // date = new Date(year, month, day);
          day += 1;
          date = new Date(year, month, day);
          console.log(date)
        } 
        return saturdays;
      }
      this.saturdays = getSaturdays(this.thisyear, this.thismonth).filter((day, index) => index % 2 == 0);
      var prepareDateArray = function (dtArr: string | any[]) {
        var arr = new Array();
        for (var i = 0; i < dtArr.length; i++) {
          arr.push((new Date(dtArr[i])).toString().substring(0, 15)); //save only the Day MMM DD YYYY part
        }
        return arr;
      }
      var getWorkingDateArray = function (dates: any[], hoildayDates: any[], workingWeekendDates: any[]) {
        // remove holidays
        var arr = dates.filter(function (dt: any) {
          return holidaysArray.indexOf(dt) < 0;
        });
        // remove weekend dates that are not working dates
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
      this.getPublicHolidays.getLeave().subscribe(
        data => {
          let temp = [];
          this.Includepublicholiday = JSON.parse(data);
          for (let leave of this.Includepublicholiday) {
            this.holidays.push(leave.date);
          }
        },error=>{
          this.showErrorMessage=true;
          this.errorMessage=this.globalErrorHandler.errorMessage;
          setTimeout(() => {
            this.showErrorMessage=false;
          }, 3000);
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
        if (workingDateArray.length == 0) {
          this.countinNumber = 0
        }
        if (this.postleave.value.chooseDays == "HalfDay") {
          if(this.count == (this.pluscount)){
            if(this.postleave.value.chooseFromDays == "morningfromHalf" && this.postleave.value.chooseToDays == "morningtoHalf"
                || this.postleave.value.chooseFromDays == "afternoonfromHalf" && this.postleave.value.chooseToDays == "afternoontoHalf"){
              this.countinNumber = workingDateArray.length - this.minus;
            }
            else{
              this.countinNumber = workingDateArray.length - this.minus; 
            } 
          }
          else if (this.count != (this.pluscount)) {
            if (workingDateArray.length == 0) {
              this.countinNumber = 0
            }
            else if (this.postleave.value.chooseFromDays == "morningfromHalf" && this.postleave.value.chooseToDays == "afternoontoHalf" ||
               this.postleave.value.chooseFromDays == "afternoonfromHalf" && this.postleave.value.chooseToDays == "morningtoHalf"||this.postleave.value.chooseFromDays == "morningfromHalf"&& this.postleave.value.chooseToDays == "morningtoHalf"
                || this.postleave.value.chooseFromDays == "afternoonfromHalf" && this.postleave.value.chooseToDays == "afternoontoHalf") {
              let number = workingDateArray.length - this.minus;
              this.countinNumber = number - this.minus;
            }else {
              this.countinNumber = workingDateArray.length - this.minus;
            }
          }
        }
        if (this.postleave.value.chooseDays == "FullDay") {
          if (this.count != (this.pluscount) || this.count == (this.pluscount)) {
            this.countinNumber = workingDateArray.length;
          }
        }
          if(this.countinNumber==0){
             this.showGetNumberError=true;
              setTimeout(() => {this.showGetNumberError=false;}, 3000)
          }
      }
  }

  handlerFull(event: any) {
    this.fulldays = event.target.value;
  }
  handlerHalf(event: any) {
    this.halfdays = event.target.value;
  }
  ok(){
    this.modalReference.close();
    this.dialogRef.close();
    // this.route.navigate(['/home']);
  }
  cancel() {
    this.statusagree.getUpdates().subscribe(
      data => {
        this.leftoverApproval =JSON.parse(data)
        for (let item of this.leftoverApproval) {
          if (item.status == 'pending' && item.empid==this.defaultEmpid ) {
            this.historyid=item.historyid;
            this.globalErrorHandler.apphistoryid=this.historyid;
          }
        }
        this.statusagree.deleteHistory(this.historyid).subscribe(data => {})
          this.modalReference.close();})
          this.dialogRef.close();
  }    

  hideDays() {
    this.showMorning = false;
  }
  showDays() {
    this.showMorning = true;
  }
  pageNavigate() {
    this.dialogRef.close();
    // this.route.navigate(["/home"])
  }
  findifsick(event: any) {
    if (this.defaultEmpid == this.empid) {
      if (event.target.value == 'sick') {
        this.hideIfsick = false;
      }else {
        this.hideIfsick = true;
      }
    }else {}
  }

  selectToSend(event: any) {
    this.noMatchGender=false;
    this.teamdetails.getEmpid().subscribe(
      data => {
        this.personDetailbsd = JSON.parse(data);
        for (let i of this.personDetailbsd) {
          if (event.target.value == i.empid) {
            this.defaultEmpid = event.target.value;
            this.personname = i.name;
            this.persondepartment = i.department;
            this.persondesignation = i.designation;
            this.personexperience = i.totalexperience;
            this.personlocation = i.city;
            this.personmanagername = i.managername;
            this.personmanageremail = i.manageremail;
            this.persongender=i.gender;
            this.personMartialstatus=i.maritalstatus;
              if(this.persongender=="female" && this.personMartialstatus=="married"){
                this.noMatchGender=true;
              }
              if(this.designation=="HR"){
                this.hideIfnotme = false;
              }
          }
        }
      }
    )
    if (event.target.value != this.empid) {
      this.hideIfnotme = false;
    } else {
      this.hideIfnotme = true;
    }
  }

  onbehalfAprroved(update:any){
    this.statusagree.getUpdates().subscribe(
      data => {
        this.leftoverApproval =JSON.parse(data)
        for (let item of this.leftoverApproval) {
          if (item.status == 'pending' && item.empid==this.defaultEmpid ) {
            this.historyid=item.historyid;
            this.modalReference.close(); 
          }
        } 
        this.modalReference=this.modalService.open(update,{ size: 'm' })   
      })
      this.globalErrorHandler.apphistoryid=this.historyid;
  }

  onAprroved(){
   this.status="Approved"
   this.statusagree.statusUpdate(this.historyid,this.defaultEmpid,this.status).subscribe(
      data => {
        this.detailsdata.push(this.status);      
        this.modalReference.close();
        this.dialogRef.close();
      },error=>{
        this.showErrorMessage=true;
        this.errorMessage=this.globalErrorHandler.errorMessage;
         setTimeout(() => {
           this.showErrorMessage=false;
         }, 3000);
       }
       ); 
        // this.route.navigate(['/home']);
      }

  succesinsave(){
    this.modalReference.close();
    this.dialogRef.close();
    // this.route.navigate(['/home']);
  }
  okforsubmit(){
    this.modalReference.close();
    this.dialogRef.close();
    // this.route.navigate(['/home']);
  }
  cancelsave(){
    this.statusagree.getUpdates().subscribe(
      data => {
        this.leftoverApproval =JSON.parse(data)
        for (let item of this.leftoverApproval) {
          if (item.status == 'not submitted' && item.empid==this.defaultEmpid){
            this.historyid=item.historyid;
            this.globalErrorHandler.apphistoryid=this.historyid;
          }
        }
        this.statusagree.deleteHistory(this.historyid).subscribe(data => {})
        this.modalReference.close();})
        this.ngOnInit();
  }    
  get field(): any {
    return this.postleave.controls;
  } 
}