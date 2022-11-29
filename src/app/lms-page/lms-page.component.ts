import { BreakpointObserver } from '@angular/cdk/layout';
import { Element } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplyLeave } from '../models/apply-leave.model';
import { LeaveDetails } from '../models/leave-details.model';
import { LeaveTracking } from '../models/leave-tracking.model';
import { Register } from '../models/register';
import { ApplyleaveService } from '../services/applyleave.service';
import { HistoryService } from '../services/historyservice.service';
import { LeaveStatusServiceService } from '../services/leave-status-service.service';
import { RegisterserviceService } from '../services/registerservice.service';

@Component({
  selector: 'app-lms-page',
  templateUrl: './lms-page.component.html',
  styleUrls: ['./lms-page.component.css']
})
export class LmsPageComponent implements OnInit {
  modeModal: boolean = false;
  hidden: boolean = false;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  empid: any;
  notification: number = 0;
  enableTs: boolean = false;
  OpenApplyLeave: boolean = false;
  enableNavBar: boolean = false;
  @ViewChild(MatSidenav)
  applyLeave = new ApplyLeave();
  tabs = ['Leave Management Systems', 'Time Schedule', 'Relieving Employee Details'];
  selected = new FormControl(0);
  EnableLms: boolean = true;
  selectedItem: any;
  tabName: String = 'Leave Management Systems';
  modalReference: any;
  loading: boolean = false;
  isChecked: boolean = false;
  //  namelist=[{name:'sangeetha'},{name:'shinchan'},{name:'dora'},{name:'jackie chan'}];
  year: String = '';
  remainingcl: String = '';

  department:any;
  name: String = '';
  personDetails = new Register();
  exp = new LeaveDetails();
  leaveDetails = new LeaveTracking();
  designation: String = '';
  leavestatus: boolean = false;
  casual: any;
  sick: any;

  empexperience: any;
  cl: any;
  sl: any;
  expcl: any;
  expbl: any;
  exppl: any;
  expml: any;
  expsl: any;
  clnum: any;
  expexperience: any;
  remaincl: any;
  remainingbl: any;
  remainingpl: any;
  remainingml: any;
  remainingsl: any;
  calcl:any;
  calsl:any;
  calpl:any;
  calbl:any;
  calml:any;
  managerName: any;
  constructor(private route: Router,
    private statusservice: LeaveStatusServiceService,
    private move: BreakpointObserver,
    private getDetails: ApplyleaveService,
    private modalService: NgbModal,
    private registerDetails: LeaveStatusServiceService,
    private firstentry: LeaveStatusServiceService) { }


  ngOnInit(): void {

    this.empid = sessionStorage.getItem("empid");
    this.registerDetails.getMemberDetails(this.empid).subscribe(
      data => {
        this.personDetails = JSON.parse(data);
        this.name=this.personDetails.name;
        this.department=this.personDetails.department;
        this.designation=this.personDetails.designation;
        this.managerName=this.personDetails.managername;

    this.statusservice.getUpdates(this.department).subscribe(
      data => {
        this.notification = JSON.parse(data).length;

      }
    );
  });

   
    this.getDetails.leaveTracking(this.empid).subscribe(
      data => {
        let leaveDetails = JSON.parse(data);
        this.year = leaveDetails.year;
        this.remainingcl = leaveDetails.carryForwardLeave;
        this.remaincl=leaveDetails.casualLeave
        this.remainingsl = leaveDetails.sickLeave;
        this.remainingbl = leaveDetails.bereavementLeave;
        this.remainingpl = leaveDetails.privilegeLeave;
        this.remainingml = leaveDetails.maternityLeave;
        // this.
      }
    );

    // this.selectedItem=this.tabs[0];
    // this.getDetails.getInfo(this.empid).subscribe(
    //   data => {
    //     this.applyLeave = JSON.parse(data);

    //   }
    // );
    // this.selectedItem=this.tabs[0];
    this.registerDetails.getMemberDetails(this.empid).subscribe(
      data => {
        this.personDetails = JSON.parse(data);
        this.name = this.personDetails.name;
        this.department = this.personDetails.department;
        this.designation = this.personDetails.designation;
        this.empexperience = this.personDetails.totalexperience;
      }
    )
    this.firstentry.getExpLeaveDetails(this.empid).subscribe(
      data => {
        // var parseJSONObject = apiValues.map(data => JSON.parse(data))
        this.exp = JSON.parse(data);
        console.log(this.exp)

        // console.log(this.experience);
        // console.log(this.empexperience);

        // console.log(this.experience);
        // this.experience = this.exp.experience;
        // console.log(this.experience);
        this.expcl = this.exp.casualLeave;
        console.log(this.expcl);
        this.expsl = this.exp.sickLeave;
        this.expbl = this.exp.bereavementLeave;
        this.exppl = this.exp.privilegeLeave;
        this.expml = this.exp.maternityLeave;
        
        // if (this.empexperience == this.experience) {
        //   console.log(this.empexperience)
        // }
        this.calcl=Math.floor((this.remaincl/this.expcl)*100);
        this.calsl=Math.floor((this.remainingsl/this.expsl)*100);
// Element.style.width = calcl + "%";
        this.calpl=Math.floor((this.remainingpl/this.exppl)*100);
        this.calbl=Math.floor((this.remainingbl/this.expbl)*100);
        this.calml=Math.floor((this.remainingml/this.expml)*100);
      }
    );
    



    //     this.registerDetails. getMemberDetails(this.empid).subscribe(
    //       data => {
    //         this.personDetails = JSON.parse(data);
    //         this.name = this.personDetails.name;
    //         this.department = this.personDetails.department;
    //         this.designation = this.personDetails.designation;

    //        let initials = this.name.charAt(0);
    // //  let initial=initials.toUpperCase;
    //        let displayAvatar= 'C'+ initials;
    //       var a= document.getElementById('avatar');
    //       a!.innerHTML=displayAvatar;

    //       }
    //     )
  }

}
