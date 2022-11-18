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

  displayedColumns: string[] = ['description', 'location', 'date','day'];
  dataSource!: MatTableDataSource<any>; 

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(private route:Router,private holidaysService:HolidayservicesService) { }

  ngOnInit(): void {
    this.holidaysService.getLeave().subscribe(data=>{
      this.dataSource=JSON.parse(data)
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
