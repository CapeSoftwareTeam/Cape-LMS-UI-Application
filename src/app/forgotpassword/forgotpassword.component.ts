import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalErrorHandlerService } from '../global-error-handler.service';
import { User } from '../models/user';

import { RegisterserviceService } from '../services/registerservice.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  forgot: boolean = false;
  submitted: boolean = false;

  successMsgPasword: boolean = false;

  forgotpasswordform = new FormGroup({
    password: new FormControl()
    , newPassword: new FormControl()

  });

  user = new User();
  showErrorMessage: boolean = false;
  errorMessage: string = '';
  constructor(private fb: FormBuilder, private registerService: RegisterserviceService, private route: ActivatedRoute, private router: Router,
  ) { }



  ngOnInit(): void {

    this.forgotpasswordform = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]], newPassword: ['', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]]
    });
  }
  validation() {

  }
  onSubmit() {
    this.submitted = true;

    //Breaks if form is invalid
    if (this.forgotpasswordform.invalid) {
      return;
    }

    // otp Validation 6 digit
    if (this.forgotpasswordform.value.password != this.forgotpasswordform.value.newPassword) {
      this.forgot = true;
      setTimeout(() => {
        this.forgot = false;
      }, 3000);
    }


    this.user.password = this.forgotpasswordform.value.password;;
    this.user.email = this.route.snapshot.paramMap.get('email') || '{}';
    //upadate password
    this.registerService.updatePassWord(this.user).subscribe((data: string) => {

      this.successMsgPasword = true;
      setTimeout(() => {
        this.successMsgPasword = false;
        this.router.navigate(['/login'])
      }, 3000);


    }, error => {


    }
    )




  }
  back() {
    this.router.navigate(['/login']);
  }
  //get controls
  get f() {
    return this.forgotpasswordform.controls;
  }
}
