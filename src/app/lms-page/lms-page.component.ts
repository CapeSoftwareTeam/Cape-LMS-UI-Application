import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lms-page',
  templateUrl: './lms-page.component.html',
  styleUrls: ['./lms-page.component.css']
})
export class LmsPageComponent implements OnInit {
  modeModal: boolean = false;
  hidden: boolean = false;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  empid: any
  notification: number = 0;
  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  leave() {
    this.route.navigate(['/applyleave']);
  }
  callholidays() {
    this.route.navigate(['/holidays'])
  }
  callProfile() {
    this.route.navigate(['/profile']);
  }
  callCalculation() {
    this.hidden = !this.hidden;
    this.route.navigate(['/leavestatus']);
  }
}
