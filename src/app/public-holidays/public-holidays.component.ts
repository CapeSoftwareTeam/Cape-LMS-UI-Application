import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HolidaysComponent } from '../holidays/holidays.component';
import { HolidayservicesService } from '../services/holidayservices.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-public-holidays',
  templateUrl: './public-holidays.component.html',
  styleUrls: ['./public-holidays.component.css']
})
export class PublicHolidaysComponent implements OnInit {

  display:boolean=false;

  displayedColumns: string[] = ['description', 'location', 'date','day'];
  dataSource!: MatTableDataSource<any>; 

  @ViewChild('holidaysSort', { static: false }) 
  holidaysSort!: MatSort;
  @ViewChild('holidaysPaginator', { static: false })
   holidaysPaginator!: MatPaginator;
  @ViewChild(MatSort)
   sort!: MatSort;
  @ViewChild(MatPaginator)
   paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.holidaysPaginator;
    this.dataSource.sort = this.holidaysSort;
  }


  constructor(private route:Router,private holidaysService:HolidayservicesService) { }

  ngOnInit(): void {
    this.holidaysService.getLeave().subscribe(data=>{
      this.dataSource= new  MatTableDataSource(JSON.parse(data));
      this.dataSource.sort = this.holidaysSort;
      this.dataSource.paginator = this.holidaysPaginator;
    })
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;

     this.dataSource.filter = filterValue.trim().toLowerCase();

 }
 

  back(){
    this.route.navigate(['/home'])
  }

}
