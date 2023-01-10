import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RegisterserviceService } from '../services/registerservice.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';
import { Register } from '../models/register';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalErrorHandlerService } from '../services/global-error-handler.service';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  enableDelete: boolean = true;
  disableAction: boolean = false;
  spinner: boolean = false;
  blurMode: boolean = false;
  successMsg: boolean = false;
  displayedColumns: string[] = ['empId', 'name', 'department', 'designation', 'managerName', 'employeeEmail', 'city', 'state', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('employeeSort', { static: false }) employeeSort!: MatSort;
  @ViewChild('employeePaginator', { static: false }) employeePaginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  element: Element[] = [];
  registerid: any;
  modalReference: any;
  showEmptyTable: boolean = false;
  showTable: boolean = true;
  showErrorMessage: boolean = false;
  errorMessage: string='';

  constructor(private registerService: RegisterserviceService,
    private route: Router,
    private dialog: MatDialog,
    private modalService: NgbModal,
    private globalErrorHandler: GlobalErrorHandlerService) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getEmployeeDetails();
    
  }

  //Get Employee Details 
  getEmployeeDetails() {
    let tempArray: any = [];
    this.registerService.getEmpid().subscribe(data => {

      tempArray = JSON.parse(data);
      let employeeData = [];
      for (let i of tempArray) {
        if (i.status == "Active"&& i.designation!="HR Manager" && i.emailid!="gk@capeindia.net" && i.emailid!="asha@capeindia.net"&&i.emailid!="srp@capeindia.net"&&i.email!="vasanthi@capeindia.net") {
          employeeData.push(i)
        }
      }

      if(employeeData.length==0){
        this.showEmptyTable = true;
        this.showTable = false;
      }
      this.dataSource = new MatTableDataSource<any>(employeeData);
      this.dataSource.paginator = this.employeePaginator;
    }, error=>{
      this.showErrorMessage=true;
      this.errorMessage=this.globalErrorHandler.errorMessage;
      setTimeout(() => {
        this.showErrorMessage=false;
      }, 3000);

    })
    this.dataSource.paginator = this.employeePaginator;
    this.dataSource.sort = this.employeeSort;
  }

  // Filtering Employee Details 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  // Delete Employee Detail
  deleteEmployee(empid: any) {
    this.registerService.deleteForm(empid).subscribe(data => {
      this.getEmployeeDetails();
      this.modalService.dismissAll();
      
      this.blurMode = true;
      this.spinner = true;
      setTimeout(() => {
        this.blurMode = false;
        this.spinner = false; 
        this.successMsg = true;
        setTimeout(() => {
          this.successMsg = false;
        }, 3000);
      }, 3000);

    }, error=>{
      this.showErrorMessage=true;
      this.errorMessage=this.globalErrorHandler.errorMessage;
      setTimeout(() => {
        this.showErrorMessage=false;
      }, 3000);

    })

  }

  // Edit Employee Details
  editEmpDetails(empid: any) {
    const dialogRef = this.dialog.open(ProfileComponent,
      {
        disableClose: true,
      });
    dialogRef.componentInstance.empid = empid;
    dialogRef.componentInstance.disableBackBtn = false;
    dialogRef.componentInstance.disableEdit = false;
    dialogRef.componentInstance.cancelProfile = true;
    dialogRef.componentInstance.viewEmployee = true;
  }


  // Delete Purpose
  gotoNextModal(deleteEmployeeTemp: any, empid: any) {
    // this.modalService.open(content, { centered: true, size:'m' });
     this.modalReference = this.modalService.open(deleteEmployeeTemp,
      {centered:true,
       size: 'm',
       backdrop:'static', 
       keyboard  : false })
  }

  // Cancel Popup Msg
  closePopup() {
    this.modalReference.close();
  }


}
