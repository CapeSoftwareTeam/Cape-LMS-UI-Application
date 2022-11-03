import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {
  @Output() applypopup=new EventEmitter();
  modeModal:boolean=true;
  constructor(private route:Router) { }

  ngOnInit(): void {
    this.applypopup.emit();
  }
  leaveApply(){
    console.log("applied")
  }
  cancel(){
    this.route.navigate(['/home'])
  }
}
