import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  empid = new FormControl('');
  name = new FormControl('');
  gender = new FormControl('');
  dob = new FormControl('');
  maritalStatus = new FormControl('');
  mobile = new FormControl('');
  alternate = new FormControl('');
  email = new FormControl('');
  doj = new FormControl('');
  department = new FormControl('');
  designation = new FormControl('');
  totalExperience = new FormControl('');
  officeLocation = new FormControl('');
  createdDate = new FormControl('');
  createdBy = new FormControl('');
  updatedDate = new FormControl ('');
  updatedBy = new FormControl ('');
  password = new FormControl('');
  OtherExperience = new FormControl('');
  capeExperience = new FormControl('');
  


  constructor() { }

  ngOnInit(): void {
  }
  

}
