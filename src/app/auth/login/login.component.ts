import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;


  constructor() {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailInput: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
  })
    ;
  }

  onSubmit(form: NgForm) {
    console.log(this.loginForm);
  }
}
