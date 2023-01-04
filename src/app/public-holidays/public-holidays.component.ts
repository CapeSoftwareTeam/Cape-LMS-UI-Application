import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HolidaysComponent } from '../holidays/holidays.component';
import { HolidayservicesService } from '../services/holidayservices.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { RegisterserviceService } from '../services/registerservice.service';

@Component({
  selector: 'app-public-holidays',
  templateUrl: './public-holidays.component.html',
  styleUrls: ['./public-holidays.component.css']
})
export class PublicHolidaysComponent implements OnInit {

  display: boolean = false;

  displayedColumns: string[] = ['description', 'location', 'date', 'day', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('holidaysSort', { static: false }) holidaysSort!: MatSort;
  @ViewChild('holidaysPaginator', { static: false }) holidaysPaginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  empid: any;
  showEmptyTable: boolean = false;
  showTable: boolean = true;

  ngAfterViewInit() {
    this.dataSource.paginator = this.holidaysPaginator;
    this.dataSource.sort = this.holidaysSort;
  }


  constructor(private route: Router, private holidaysService: HolidayservicesService, private registerService: RegisterserviceService) {
    this.dataSource = new MatTableDataSource<any>()
  }

  ngOnInit(): void {

    // Geting  Holidays Details employee Designation
    this.empid = sessionStorage.getItem('empid')

    let designation = '';
    this.registerService.getForm(this.empid).subscribe(
      data => {
        designation = JSON.parse(data).designation;
        
        if (designation == "HR") {
          this.holidaysService.getLeave().subscribe(
            data => {
              if(JSON.parse(data).length==0){
                this.showEmptyTable = true;
                this.showTable = false;
              }
              else{
                this.displayedColumns = ['description', 'location', 'date', 'day', 'action'];
                this.dataSource = new MatTableDataSource(JSON.parse(data));
                this.dataSource.sort = this.holidaysSort;
                this.dataSource.paginator = this.holidaysPaginator;
                
              }
           
          })

        }
        else {
          this.holidaysService.getLeave().subscribe(data => {
            if(JSON.parse(data).length==0){
              this.showEmptyTable = true;
              this.showTable = false;
            }
            else{
              this.displayedColumns = ['description', 'location', 'date', 'day'];
              this.dataSource = new MatTableDataSource(JSON.parse(data));
              this.dataSource.sort = this.holidaysSort;
              this.dataSource.paginator = this.holidaysPaginator;
            }
      
          })
        }
      })

  }

  // Fitering Leaves
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Navigation
  back() {
    this.route.navigate(['/home'])
  }

  // Delete Holidays From UI
  deleteLeave(publicLeaveId: any) {
    this.holidaysService.deleteLeave(publicLeaveId).subscribe(data => {
      console.log("Holiday deleted")
      this.ngOnInit();
    })
  }

}
