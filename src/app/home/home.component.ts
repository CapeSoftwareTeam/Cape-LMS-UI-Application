import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplyLeave } from '../models/apply-leave.model';
import { Register } from '../models/register';
import { ApplyleaveService } from '../services/applyleave.service';
import { LeaveStatusServiceService } from '../services/leave-status-service.service';
import { RegisterserviceService } from '../services/registerservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  apply:boolean=false;
  holidays:boolean=false;
  lmspage:boolean=false;
  enableTs: boolean = false;
  OpenApplyLeave: boolean = false;
  enableNavBar: boolean = false;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  modeModal: boolean = false;
  hidden: boolean = false;
  empid: any
  notification: number = 0;
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
  leavestatus:boolean=false;
  initials: String='';
  constructor(private route: Router,
    private statusservice: LeaveStatusServiceService,
    private move: BreakpointObserver,
    private getDetails: ApplyleaveService,
    private modalService: NgbModal,
    private registerDetails: RegisterserviceService) { }

  ngAfterViewInit(): void {
    this.move.observe(['(max-width:800px)']).subscribe((data) => {
      if (this.selected) {
        if (data.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();

        }
      }
    }
    );
  }

  // if(tab[0]==selected){
  //   this.EnableLms=true;
  // }

  ngOnInit(): void {
    this.lmspage=true;
     
    this.empid = sessionStorage.getItem("empid");

    this.statusservice.getUpdates(this.empid).subscribe(
      data => {
        this.notification = JSON.parse(data).length;

      }
    );
    this.getDetails.leaveTracking(this.empid).subscribe(
      data => {
        let leaveDetails = JSON.parse(data);
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
    this.registerDetails. getMemberDetails(this.empid).subscribe(
      data => {
        this.personDetails = JSON.parse(data);
        this.name = this.personDetails.name;
        this.department = this.personDetails.department;
        this.designation = this.personDetails.designation;

       let initials = this.name.charAt(0);
//  let initial=initials.toUpperCase;
       let displayAvatar= 'C'+ initials;
      var a= document.getElementById('avatar');
      a!.innerHTML=displayAvatar;

      }
    )
  }


  addTab() {
    this.tabs.push('New');
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  OpenModalBox() {
    this.modeModal = true;
  }
  callProfile() {
    this.route.navigate(['/profile']);
  }
  callCalculation() {
    this.route.navigate(['/leavestatus']);
  }
  callApplyLeave(){
    this.holidays=false;
    this.lmspage=false;
    this.apply=true;

    // this.route.navigate(['/applyleave']);
  }
  callHolidays(){
    this.holidays=true;
    this.lmspage=false;
    this.apply=false;

    // this.route.navigate(['/holidays']);
  }
  callHistory(){
    this.route.navigate(['/history']);
  }
  callRegister(){
    this.route.navigate(['/register']);
  }

  getSelectedindex(event: any) {
    console.log(event);

    this.tabName = this.tabs[event];

  }
  termsCondition(termsContent: any) {
    this.modalReference = this.modalService.open(termsContent, { size: 'xl' })
  }
  onCancel() {
    this.modalReference.close();
  }
  //   getInitial(name){
  //     const canvas= document.createElement('canvas');
  //   canvas.style.display='none';
  //   canvas.width=32;
  //   canvas.height=32;
  //   document.body.appendChild(canvas);
  //   const context=canvas.getContext('2d');
  //   context.fillstyle ='#476ce8';
  //   context.fillRect(0,0,canvas.width,canvas.height);
  // context?.font='16px arial';
  // context?.fillStyle='#fffff';
  // const nameArray=name.split(' ');
  // let initials='';
  // for(let i=0;i<nameArray.length;i++){
  //   if(i<=1){
  //     initials=initials+nameArray[i][0];
  //   }
  //   if(initials.length>1){
  //     context?.fillText(initials.toUpperCase(),7,22);
  //   }
  //   else{
  //     context?.fillText(initials.toLowerCase(),10,22);
  //   }
  //   const data=canvas.toDataURL();
  //   document.body.removeChild(canvas);
  //   return data;
  // }

  //   }


}
