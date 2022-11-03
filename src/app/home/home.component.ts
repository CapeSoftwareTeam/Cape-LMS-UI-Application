import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveStatusServiceService } from '../services/leave-status-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
modeModal:boolean=false;
hidden:boolean=false;
empid:any
notification:number=0;
  constructor(private route: Router,
    private statusservice:LeaveStatusServiceService ) { }

  ngOnInit(): void {
    localStorage.setItem("empid","cepl-008");
    sessionStorage.setItem("empid","cepl-008");
    this.empid=sessionStorage.getItem("empid");

    this.statusservice.getUpdates(this.empid).subscribe(
      data=>{
       this.notification= JSON.parse(data).length;

      }
    );

  }
OpenModalBox(){
this.modeModal=true;
}
callProfile(){
  this.route.navigate(['/profile']);
}
callCalculation(){
  this.hidden = !this.hidden;
  this.route.navigate(['/leavestatus']);
}
leave(){
  this.route.navigate(['/applyleave']);
}
}
