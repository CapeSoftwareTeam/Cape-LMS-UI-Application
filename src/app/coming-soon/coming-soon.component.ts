import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css']
})
export class ComingSoonComponent implements OnInit {
  
  constructor() { }
  
  ngOnInit(): void {

    
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
       
      }else if(this.timeLeft&&this.minute==0){
        this.hour--;
        this.minute=59
        this.timeLeft=59
      }
       else if(this.timeLeft==0) {
        this.minute--;
        this.timeLeft=59
      }
    },1000)

  }
  timeLeft: number = 59;
  minute:number=59;
  hour:number=2;
  interval:any;

startTimer() {
    
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
    



 
   
}
