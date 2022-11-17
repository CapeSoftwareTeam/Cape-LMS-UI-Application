import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
date:any;
router:any;
  constructor(private route:Router) { }

  ngOnInit(): void {
    this.date = new Date().getFullYear()
  }
  loginPage(){
    this.route.navigate(['/login']);

  }

}
