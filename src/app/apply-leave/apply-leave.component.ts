import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplyLeave } from '../models/apply-leave.model';
import { ApplyleaveService } from '../services/applyleave.service';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {

  @Output() applypopup = new EventEmitter();
  modeModal: boolean = true;
  leave: any = [];
  empid: any;
selectedItem: any;

  constructor(private route: Router,
    private apply: ApplyleaveService,
    private fb: FormBuilder,
    private getDetails: ApplyleaveService) { }

  applyLeave = new ApplyLeave();

  postleave !:FormGroup;

  ngOnInit(): void {
    this.postleave = new FormGroup({
      leaveType: new FormControl(''),
      noofdays: new FormControl(''),
      fromdate: new FormControl(''),
      todate: new FormControl(''),
      reasonforapply: new FormControl(''),
      status: new FormControl('pending'),
    });
    this.applypopup.emit();
  this.empid = sessionStorage.getItem("empid");
    this.getDetails.getInfo(this.empid).subscribe(
      data => {
       this.applyLeave= JSON.parse(data);
      }
    )
  }
  leaveApply() {
    if(this.selectedItem=='casual'){
      let lastDate=this.applyLeave.approveddate.getMonth;
      let cl=this.applyLeave.casualLeave;
       let presentDate= this.applyLeave.createddate.getMonth;
       if(presentDate==lastDate){
        console.log("openmodal popup and say no casual leave is available");
       }
    }

    this.applyLeave.leaveType = this.postleave.value.leaveType;
    this.applyLeave.noofdays = this.postleave.value.noofdays;
    this.applyLeave.fromdate = this.postleave.value.fromdate;
    this.applyLeave.todate = this.postleave.value.todate;
    this.applyLeave.reasonforapply = this.postleave.value.reasonforapply;
    this.applyLeave.status = this.postleave.value.status;
    this.apply.leaveRegister(this.applyLeave).subscribe(
      data => { this.leave.push(this.postleave) }
    )

    console.log("applied")
  }
  cancel() {
    this.route.navigate(['/home'])
  }
  selected(){
console.log(this.selectedItem);
  }
}
