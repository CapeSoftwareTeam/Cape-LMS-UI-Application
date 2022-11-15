import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LeaveStatusServiceService } from '../services/leave-status-service.service';

@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.css']
})
export class LeaveStatusComponent implements OnInit {
  empid: any
  notification: number = 0;
  showmessage: boolean = false;
  enableApprove: boolean = true;
  enableSubmit: boolean = false;
  successValue: string = "approved";
  displayedColumns: string[] = ['createddate', 'name', 'leaveType', 'fromdate', 'todate', 'reasonforapply', 'noofdays', 'status'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild('dataPaginator', { static: false }) dataPaginator!: MatPaginator;

  empId: any;
  constructor(private statusservice: LeaveStatusServiceService,
    private statusagree: LeaveStatusServiceService,
    private route: Router) { }

  ngOnInit(): void {
 
    this.empid = sessionStorage.getItem("empid");

    this.statusservice.getUpdates(this.empid).subscribe(
      data => {
        this.notification = JSON.parse(data).length;
        this.getpendingData();
      }
    );

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
        console.log("updated successfully")
        this.getpendingData();

      }
    );

  }
  submit() {
    console.log("Apply")
  }
  // if(this.empid.equalsIgnoreCase("user")){
  //   this.enableSubmit=true;
  //   this.enableApprove=false;
  // }
  // else{
  //   this.enableApprove=true;
  //   this.enableSubmit=false;
  // }

  getpendingData() {
    this.statusservice.getUpdates(this.empId).subscribe(
      data => {
        // for(int i=0;i=this.dataSource;i++)

        let b = [];
        for (let item of JSON.parse(data)) {
          if (item.status == 'pending') {
            b.push(item);
          }

        }
        this.dataSource = new MatTableDataSource(b);
        this.dataSource.paginator = this.dataPaginator;
        console.log("retrived successfully")
      }
    );
  }
  editOption() {
    this.statusservice.getUpdates(this.empId).subscribe(
      data => {

        for (let fetch of JSON.parse(data)) {

        }
      });
  }
  back() {
    this.route.navigate(['/home']);
  }
}

