import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, timer } from 'rxjs';
import { ChatbotService } from '../chatbot.service';
import { ApplyLeave } from '../models/apply-leave.model';
import { LeaveDetails } from '../models/leave-details.model';
import { LeaveTracking } from '../models/leave-tracking.model';
import { Register } from '../models/register';
import { ApplyleaveService } from '../services/applyleave.service';

import { LeaveStatusServiceService } from '../services/leave-status-service.service';
import { RegisterserviceService } from '../services/registerservice.service';
declare const myFunction: any;
@Component({
  selector: 'app-lms-page',
  templateUrl: './lms-page.component.html',
  styleUrls: ['./lms-page.component.css']
})

export class LmsPageComponent implements OnInit {
close:boolean=false;
open:boolean=false;
  hidematernity:boolean=false;
  hourHandPosition=0;
  minuteHandPosition=0;
  secondHandPosition=0;
dateTime={
  year:'',
  month:'',
  day:'',
  hour:'',
  minute:'',
  second:'',
};
coverspace:boolean=false;
  modeModal: boolean = false;
  panelOpenState: boolean = false;
  hideTeamDetails:boolean=false;
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
  year: String = '';
  remainingcl: String = '';
  teamdetails:any=[];
  personDetails = new Register();
  exp = new LeaveDetails();
  leaveDetails = new LeaveTracking();
  department:any;
  name: String = '';
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
  location: any
  teamdepartment: any;
  teamlocation: any;
  city: any;
  members:any =[]
  memberName: any;
  counter!:Subscription
  minuscl: any;
  minussl: any;
  minusbl: any;
  minuspl: any;
  minusml: any;
  martialstatus: any;
  gender: any;
  leaveTotal: any;
  trackdetails: any;
  counttotal: any;
  valueBot: string="";
  strMsg: string=""; 

  // open:boolean=false;
  // close:boolean=false;
 
  constructor(private route: Router,
    private statusservice: LeaveStatusServiceService,
    private move: BreakpointObserver,
    private getDetails: ApplyleaveService,
    private modalService: NgbModal,
    private registerDetails: LeaveStatusServiceService,
    private firstentry: LeaveStatusServiceService,
    private teamDetails:RegisterserviceService,private chatBot:ChatbotService
  ) { }
   
    // @ViewChild("legend", { static: true } )
    // private legend: IgxLegendComponent
    // @ViewChild("chart", { static: true } )
    // private chart: IgxCategoryChartComponent

    // private _highestGrossingMovies: HighestGrossingMovies = null;
    // public get highestGrossingMovies(): HighestGrossingMovies {
    //     if (this._highestGrossingMovies == null)
    //     {
    //         this._highestGrossingMovies = new HighestGrossingMovies();
    //     }
    //     return this._highestGrossingMovies;
    // }
  ngOnInit(): void {
// setInterval(()=>{
//   const date=new Date();
//   this.updateClock(date);
// },1000);


this.startClock();
    this.empid = sessionStorage.getItem("empid");
    this.registerDetails.getMemberDetails(this.empid).subscribe(
      data => {
        this.personDetails = JSON.parse(data);
        this.name=this.personDetails.name;
        this.department=this.personDetails.department;
        this.designation=this.personDetails.designation;
        this.managerName=this.personDetails.managername;
this.city=this.personDetails.city;
    this.statusservice.getUpdates().subscribe(
      data => {
        this.notification = JSON.parse(data).length;

      }
    );
  });
  

   
    this.getDetails.leaveTracking(this.empid).subscribe(
      data => {
        let leaveDetails = JSON.parse(data);
        if(leaveDetails=="undefined"|| leaveDetails=="null"){
          this.year =  "new Date().getFullYear()";
          this.remainingcl = "0";
          this.remaincl=leaveDetails.casualLeave
          this.remainingsl = "0";
          this.remainingbl = "0";
          this.remainingpl = "0";
          this.remainingml ="0";
        }else{
          this.year = leaveDetails.year;
          this.remainingcl = leaveDetails.carryForwardLeave;
          this.remaincl=leaveDetails.casualLeave
          this.remainingsl = leaveDetails.sickLeave;
          this.remainingbl = leaveDetails.bereavementLeave;
          this.remainingpl = leaveDetails.privilegeLeave;
          this.remainingml = leaveDetails.maternityLeave;
        }
      
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
        this.martialstatus=this.personDetails.maritalstatus;
        this.gender=this.personDetails.gender;
        if(this.martialstatus=="married" && this.gender=="female"){
          this.hidematernity=true;this.coverspace=false;
        }
        else{ this.hidematernity=false;this.coverspace=true;}
      }
    )
    this.firstentry.getExpLeaveDetails(this.empid).subscribe(
      data => {
        // var parseJSONObject = apiValues.map(data => JSON.parse(data))
        this.exp = JSON.parse(data);
        console.log(this.exp)

       
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


this.minuscl=this.expcl-this.remaincl;
this.minussl=this.expsl-this.remainingsl;
this.minusbl=this.expbl-this.remainingbl;
this.minuspl=this.exppl-this.remainingpl;
this.minusml=this.expml-this.remainingml;

this.leaveTotal = this.remaincl+this.remainingsl + this.remainingbl+this.remainingpl +this.remainingml;
this.trackdetails= this.expcl + this.expsl + this.expbl +this.exppl+ this.expml;
 this.counttotal=Math.floor((this.leaveTotal/this.trackdetails)*100);

      }
    );
    
    // this.departmentService.getHistoryBasedOnRole(this.department).subscribe(
      this.teamDetails.getEmpid().subscribe(
      data=>{
        // let members=[];
         this.teamdetails = JSON.parse(data);
          for(let team of this.teamdetails){
              if(team.city==this.city && team.department==this.department){
                this.members.push(team);

  
              }
            // if((this.department==this.teamdepartment)&&(this.location==this.teamlocation)){
            // this.memberName= team.name;
            
              // this.teamname=form.push(team)

              // console.log(team);
            
          }
        
        
      });
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
  enableHideTeamDetails(){
    this.hideTeamDetails= true;
    // if(this.hideTeamDetails= true){
    //   this.hideTeamDetails= false
    // }else{
    //   this.hideTeamDetails= true;
    // }
  }

//   updateClock(date:any){
//     this.secHand.nativeElement.style.transform='rotate('+date.getSeconds()*6+'deg)';
//     this.minHand.nativeElement.style.transform='rotate('+date.getSeconds()*6+'deg)';
//     this.hrHand.nativeElement.style.transform='rotate('+date.getSeconds()*6+'deg)';
//   }
  startClock(){
    this.counter=timer(0,1000).subscribe(
      (res)=>{
        let date=new Date();
        let seconds=date.getSeconds();
        let minutes=date.getMinutes();
        let hour=date.getHours();
        let day=date.getDate();
        let month=date.getMonth() +1;
        let year =date.getFullYear();

this.dateTime.year=this.displayDoubleDights(year);
this.dateTime.month=this.displayDoubleDights(month);
this.dateTime.day=this.displayDoubleDights(day);
this.dateTime.hour=this.displayDoubleDights(hour);
this.dateTime.minute=this.displayDoubleDights(minutes);
this.dateTime.second=this.displayDoubleDights(seconds);

        this.secondHandPosition=seconds * 6;
        this.minuteHandPosition=minutes * 6;
        this.hourHandPosition=(hour >11 ? hour - 12: hour) * 30 
        + Math.floor(minutes/12)*6;

    }
  );
}
displayDoubleDights(value:number):string{
  return('00' + value).slice(-2);
}

//   let cp=document.querySelector(".circular-progress"),
//   pv=document.querySelector(".progress-value");

//   let pstartvalue=0,
//    pendvalue=90,
//  speed=100;
//   let progress =setInterval(()=>{
//     pstartvalue++;

//     pv.textContent=`${pstartvalue}%`
//     cp.style.background =`conic-gradient(#7d2ae8 ${pstartvalue * 3.6}deg , #ededed 0deg)`
//     if(pstartvalue==pendvalue){
//       clearInterval(progress);
//     }
//   },100);
// }
                                  //  ChatBot Code Starts
onOpen(){
   this.open=true; 
   this.close=true;
}
onClose(){
this.close=false;
this.open=false;
}
sendMessage() {
  var input_data = (document.getElementById("chatquery") as HTMLInputElement).value;
  if(input_data != ""){
    document.getElementById("chats")?.insertAdjacentHTML("afterbegin","<div class='messages__item messages__item--operator'>"+input_data+"</div>");
    (document.getElementById("chatquery") as HTMLInputElement).value = "";
    fetch("http://localhost:5000?q="+input_data)
    .then(x=>x.json())
    .then(
      (x)=>{
        document.getElementById("chats")?.insertAdjacentHTML("afterbegin","<div class='messages__item messages__item--visitor'>"+x.msg+"</div>");
        (document.getElementById("chatquery") as HTMLInputElement).value
      }
    )
  }else{
    alert("no")
  }
   
}  
                                          // ChatBot Code ends

}