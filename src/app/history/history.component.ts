import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { clipboardCheck, filter } from 'ngx-bootstrap-icons';
;
import { RegisterserviceService } from '../services/registerservice.service';
import { FormGroup } from '@angular/forms';
import { HistoryService } from '../services/historyservice.service';
import { ApplyleaveService } from '../services/applyleave.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']

})
export class HistoryComponent implements OnInit {
  enable: boolean = false;
  approved: boolean = false;
  pending: boolean = false;
  cancelled: boolean = false;
  enableDelete: boolean = false;
  empid: any;
  displayedColumns = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'toDate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leavetype', 'reasonForApply', 'location', 'delete'];
  // displayedColumns: any=[];
  Color!: 'pink';
  dataSource1!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;
  @ViewChild('historySort', { static: false }) historySort!: MatSort;
  element: Element[] = [];
  loading = false;

  @ViewChild('historyPaginator', { static: false }) historyPaginator!: MatPaginator;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  adminView: boolean = true;
  designation: string = "";
  department: string = "";
  role: any;
  details: any;
  // hide:boolean=true;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }

  selection = new SelectionModel<Element>(true, []);




  constructor(private historyService: HistoryService, private registerService: RegisterserviceService
    // private registerService: RegisterserviceService,
    ) {
    // this.designation="softwaremanager";
    // this.department="software";
    //  this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','reasonForApply'];
    this.dataSource1 = new MatTableDataSource<any>();
    this.dataSource2 = new MatTableDataSource<any>();
  }


  ngOnInit(): void {

    this.empid = sessionStorage.getItem('empid');

    let designation = '';
    this.registerService.getForm(this.empid).subscribe(
      data => {
        designation =  JSON.parse(data).designation;

        //user
        if (designation == "software trainee1" || designation == "DESIGNING" ||
        designation == "TESTING" || designation == "SALES" || designation == "MARKETING") {
         this.displayedColumns = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'toDate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'leavetype', 'reasonForApply'];

         this.historyService.getHistoryBasedOnUser(this.empid).subscribe(
          data => {
            this.dataSource1 = new MatTableDataSource(JSON.parse(data));
            this.dataSource1.sort = this.historySort;
            this.dataSource1.paginator = this.historyPaginator;
            
          });

       }
       //Admin
        else {
          this.enableDelete = true;
          this.displayedColumns = ['empId', 'name', 'appliedDate', 'approvedDate', 'fromDate', 'toDate', 'noOfDays', 'lopdays', 'status', 'approvedBy', 'department', 'leavetype', 'reasonForApply', 'location', 'delete'];
         this.enable = true;
          this.historyService.getHistoryBasedOnRole('Software').subscribe(
            data => {
              this.dataSource2 = new MatTableDataSource(JSON.parse(data));
              this.dataSource2.sort = this.historySort;
              this.dataSource2.paginator = this.historyPaginator;
            });
          
          this.historyService.getHistoryBasedOnUser(this.empid).subscribe(
            data => {
              this.dataSource1 = new MatTableDataSource(JSON.parse(data));
              this.dataSource1.sort = this.historySort;
              this.dataSource1.paginator = this.historyPaginator;
            });
        }
      });

   
       
    // else if(JSON.parse(data).designation=="TESTING_MANAGER"){
    //   this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','department','leavetype','reasonForApply','location','delete'];

    // }

    // else if(JSON.parse(data).designation=="TESTING" &&JSON.parse(data).managername=="VINOTH"){
    //   this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','reasonForApply',];

    // }
    // else if(JSON.parse(data).designation=="SALES_MANAGER"){
    //   this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','department','leavetype','reasonForApply','location','delete'];

    // }
    // else if(JSON.parse(data).designation=="SALES" &&JSON.parse(data).managername=="AZHAGESAN"){
    //   this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','reasonForApply',];

    // }
    // else if(JSON.parse(data).designation=="MARKETING_MANAGER"){
    //   this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','department','leavetype','reasonForApply','location','delete'];
    // }
    // else if(JSON.parse(data).designation=="MARKETING" &&JSON.parse(data).managername=="AZHAGESAN"){
    //   this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','reasonForApply',];


    // }



    // if(this.destignation=="User"){
    //   this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','reasonForApply',];
    // }
    // else if(this.destignation=="softwareManager" && this.department=="software"){

    // }
    // else{
    //   this.displayedColumns = ['empId','name','appliedDate','approvedDate','fromDate','toDate','noOfDays','lopdays','status','approvedBy','reasonForApply'];
    //   this.dataSource=new MatTableDataSource<any>();
    // }



    this.registerService.getMemberDetails(this.empid).subscribe(data => {
      let details = JSON.parse(data);
      this.role = this.details.designation();

    })




    //  onSelectToggled(element:Element){
    //    this.selection.toggle(element);
    //   if(this.selection.toggle['length'] && this.dataSource.filteredData.findIndex['length']){
    //     this.enableDelete=true;

    // else if(this.selection.deselect(...this.dataSource.filteredData)&& this.dataSource.filteredData.findIndex['length']){
    //   this.enableDelete=false;
    // }


    // selectAll(){
    //   this.selection.selected
    // }

    //  isAllSelected(){
    //    return this.selection.selected.length == this.dataSource.filteredData.length;

    // }

    //  toggleAll(){
    //   if(this.isAllSelected()){
    //     this.selection.clear();
    //    }
    //     else{
    //     this.selection.select(...this.dataSource.filteredData);
    //   }


  }
  User() {
    // this.enable = false;

  }

  Admin() {

  }


  deleteHistory(historyid: number) {

    this.historyService.deleteHistory(historyid).subscribe(
      data => {
        this.ngOnInit();
        setTimeout(() => {

        }, 2000);
      }


    )
  }



}
