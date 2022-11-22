import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplyLeave } from '../models/apply-leave.model';
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
empid:any;
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
  remainingsl: String = '';
  department: String = '';
  name: String = '';
  personDetails = new Register();
  designation: String = '';
  leavestatus: boolean=false;
  casual: any;
  sick: any;
  casualsforprogress: any;
  sickforprogress: any;
  this: any;

  constructor(private route:Router,
    private statusservice: LeaveStatusServiceService,
    private move: BreakpointObserver,
    private getDetails: ApplyleaveService,
    private modalService: NgbModal,
    private registerDetails: LeaveStatusServiceService) { }


  ngOnInit(): void {
 
    this.empid = sessionStorage.getItem("empid");

    this.statusservice.getUpdates(this.empid).subscribe(
      data => {
        this.notification = JSON.parse(data).length;

      }
    );
    this.getDetails.leaveTracking(this.empid).subscribe(
      data => {
        let leaveDetails = JSON.parse(data);
        this.casualsforprogress =leaveDetails.casualLeave;

        this.year = leaveDetails.year;
        this.remainingcl = leaveDetails.carryForwardLeave;

        // this.
      }
    );

    // this.selectedItem=this.tabs[0];
    this.getDetails.getInfo(this.empid).subscribe(
      data => {
        this.applyLeave = JSON.parse(data);

      }
    );
    // this.selectedItem=this.tabs[0];
    this.registerDetails.getMemberDetails(this.empid).subscribe(
      data => {
        this.personDetails = JSON.parse(data);
        this.name = this.personDetails.name;
        this.department = this.personDetails.department;
        this.designation = this.personDetails.designation;
      }
    )
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
