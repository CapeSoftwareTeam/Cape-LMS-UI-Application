import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ApplyLeave } from '../models/apply-leave.model';
import { ApplyleaveService } from '../services/applyleave.service';
import { LeaveStatusServiceService } from '../services/leave-status-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  enableTs:boolean=false;
  OpenApplyLeave:boolean=false;
  enableNavBar: boolean = false;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  modeModal: boolean = false;
  hidden: boolean = false;
  empid: any
  notification: number = 0;
  applyLeave = new ApplyLeave();
  tabs = ['Leave Management Systems', 'Time Schedule', 'Relieving Employee Details'];
  selected = new FormControl(0);
  EnableLms:boolean=true;
  selectedItem:any;
  tabName :String='Leave Management Systems';
  constructor(private route: Router,
    private statusservice: LeaveStatusServiceService,
    private move: BreakpointObserver,
    private getDetails: ApplyleaveService) { }

  ngAfterViewInit(): void {
    this.move.observe(['(max-width:800px)']).subscribe((data) => {if(this.selected){
      if (data.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();

      }
    }
    }
    );
  }

// if(tab[0]==selected){
//   this.EnableLms=true;
// }

  ngOnInit(): void {
    localStorage.setItem("empid", "cepl-001");
    sessionStorage.setItem("empid", "cepl-001");
    this.empid = sessionStorage.getItem("empid");

    this.statusservice.getUpdates(this.empid).subscribe(
      data => {
        this.notification = JSON.parse(data).length;

      }
    );
    this.getDetails.getInfo(this.empid).subscribe(
      data => {
        this.applyLeave = JSON.parse(data);
      }
    )
    // this.selectedItem=this.tabs[0];
  }


  addTab() {
    this.tabs.push('New');
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  OpenModalBox() {
    this.modeModal = true;
  }
  callProfile() {
    this.route.navigate(['/profile']);
  }
  callCalculation() {
    this.hidden = !this.hidden;
    this.route.navigate(['/leavestatus']);
  }


  getSelectedindex(event:any){
console.log(event);

  this.tabName = this.tabs[event];

  }

}
