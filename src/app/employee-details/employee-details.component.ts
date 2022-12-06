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
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  enableDelete: boolean = true;
  disableAction: boolean = false;

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

  constructor(private registerService: RegisterserviceService,
    private route: Router,
    private dialog: MatDialog,
    private modalService: NgbModal) {
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
        if (i.status == "Active") {
          employeeData.push(i)
        }
      }
      this.dataSource = new MatTableDataSource<any>(employeeData);
      this.dataSource.paginator = this.employeePaginator;
    })
    this.dataSource.paginator = this.employeePaginator;
    this.dataSource.sort = this.employeeSort;
  }

  // Navigation
  navigateToHome() {
    this.route.navigate(['/home'])
  }

  // Filtering Employee Details 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Delete Employee Detail
  deleteEmployee(empid: any) {
    this.registerService.deleteForm(empid).subscribe(data => {
      console.log("employee deleted ")
      this.getEmployeeDetails();
      this.modalService.dismissAll();
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

    console.log("employee edited")
  }

  // Delete Purpose
  gotoNextModal(content: any, empid: any) {
    this.modalService.open(content, { centered: true, backdrop: 'static' });
  }

  // Cancel Popup Msg
  closePopup() {
    this.modalService.dismissAll();
  }

}
