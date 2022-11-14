import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
date:any;
  constructor() { }

  ngOnInit(): void {
    this.date = new Date().getFullYear()
  }

}
