import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApplyLeave } from '../models/apply-leave.model';
import { ApplyleaveService } from '../services/applyleave.service';
import { HistoryService } from '../services/historyservice.service';
import { LeaveStatusServiceService } from '../services/leave-status-service.service';

@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.css']
})
export class LeaveStatusComponent implements OnInit {
  @ViewChild('dataPaginator', { static: false }) dataPaginator!: MatPaginator;
  empid: any
  notification: number = 0;
  admin:boolean=false;
  showmessage: boolean = false;
  enableApprove: boolean = true;
  enableSubmit: boolean = false;
  successValue: string = "approved";
  displayedColumns: string[] = ['createddate', 'name', 'leaveType', 'fromdate', 'todate', 'reasonforapply', 'noofdays', 'status'];
  dataSource1 = new MatTableDataSource<any>;
  dataSource2 = new MatTableDataSource<any>;
  
  empId: any;
  applyleave=new ApplyLeave();
  statusRequest: any=[];
  detailsdata: any=[];
  personDetails: any=[];
  designation: any;
  department: any;
  managerName: any;
  name: any;
  constructor(private statusservice: LeaveStatusServiceService,
    private statusagree: LeaveStatusServiceService,
    private route: Router,
    private leaveRegister:ApplyleaveService,
    private registerDetails: LeaveStatusServiceService,
    private departmentService:HistoryService) { }

  ngOnInit(): void {
 
    this.empid = sessionStorage.getItem("empid");
    this.registerDetails.getMemberDetails(this.empid).subscribe(
      data => {
        this.personDetails = JSON.parse(data);
        this.name=this.personDetails.name;
        this.department=this.personDetails.department;
        this.designation=this.personDetails.designation;
        this.managerName=this.personDetails.managerName;
        if(this.designation=='Manager'||this.designation=='HR'){
          this.admin=true;
        }
      });

      
    this.statusservice.getUpdates(this.department).subscribe(
      data => {
        this.notification = JSON.parse(data).length;
        console.log(this.notification);
        this.getpendingData();
        this.getstatusData();
      }
    );
  
if(this.department=='Software' && this.designation=='Manager'){
  this.admin=true;
  this.departmentService.getHistoryBasedOnRole(this.department).subscribe(
    data=>{
      let a=[];
      for(let i of JSON.parse(data)){
        a.push(i);
      }

    }
  )
}
//  for(let i of JSON.parse(data)){
//   this.department!=i.department;
//   details.push(i);
//  }

    // let empId : sessionStorage.getItem("empid");

  }


  // return (<FormArray>this.questionForm.get('questionHtml')).controls;
  approve(historyid: Number, status: string) {
    this.showmessage = true;
    setTimeout(() => { this.showmessage = false; }, 2000);
    this.enableApprove = true;
    this.enableSubmit = false;

    this.statusagree.statusUpdate(historyid, status).subscribe(
      data => {
   
   this.detailsdata.push(status);
        console.log("updated successfully")
        console.log(status);
      }
    );

  }


  getpendingData() {
    // this.name==this.managername
    this.empid = sessionStorage.getItem("empid");
    this.registerDetails.getMemberDetails(this.empid).subscribe(
      data => {
        this.personDetails = JSON.parse(data);
        this.name=this.personDetails.name;
        this.department=this.personDetails.department;
        this.designation=this.personDetails.designation;
        this.managerName=this.personDetails.managerName
    
    if(this.designation=='Manager'){
    this.statusservice.getUpdates(this.department).subscribe(
      data => {
        let b = [];
       
        for (let item of JSON.parse(data)) {
          // if(this.name==q.managername && this.department==q.departmemt){
          if (item.status == 'pending') {
            console.log("condition true");
            // if(item.managerName== this.name ){
            //   console.log("mann condition true");
            b.push(item);
            console.log(b.length);
          }
        //  }
        }
        this.dataSource1 = new MatTableDataSource(b);
        this.dataSource1.paginator = this.dataPaginator;
        console.log("retrived pending successfully")
      }
    );
  }
})
}
  managername(empid: any, managername: any) {
    throw new Error('Method not implemented.');
  }
  getstatusData() {
    this.empid = sessionStorage.getItem("empid");
        this.statusservice.separationDetails(this.empid).subscribe(
          data => {
            let c = [];
            for (let item of JSON.parse(data)) {
           
              if (item.status == 'not submitted' ) {
                c.push(item);
              }
            
            }
            this.dataSource2 = new MatTableDataSource(c);
            this.dataSource2.paginator = this.dataPaginator;
            console.log("retrived not submitted successfully")
          }
        );
      }


  // user(){
  //    console.log('user');
  //    this.getpendingData();
  // }
  // admin(){
  //   console.log('admin')
  //   this.getpendingData();
  // }
  back() {
    this.route.navigate(['/home']);
  }
  submit(historyid: Number, status: string){
    this.statusagree.statusUpdate(historyid, status).subscribe(
      data=>{ this.applyleave.status='pending' }
    )
    console.log("U can submit here")

    // this.applyLeave.leaveType = this.postleave.value.leaveType;
    // this.applyLeave.noofdays = this.countinNumber;
    // this.applyLeave.fromdate = this.postleave.value.fromdate;
    // this.applyLeave.todate = this.postleave.value.todate;
    // this.applyLeave.reasonforapply = this.postleave.value.reasonforapply;
    // this.applyLeave.status = 'not submitted';
    // this.apply.leaveRegister(this.applyLeave).subscribe(
    //   data => { this.leave.push(this.postleave) }
    // )
  }
}

