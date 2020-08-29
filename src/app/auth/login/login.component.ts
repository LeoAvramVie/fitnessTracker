import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UiServiceService} from '../../shared/ui.service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading = false;
  loadingSubs = new Subscription();


  constructor(private authService: AuthService,
              private uiService: UiServiceService) {
  }



  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe( isLoading => {
      this.isLoading = isLoading;
    });
    this.loginForm = new FormGroup({
      emailInput: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
    ;
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: this.loginForm.value.emailInput,
      password: this.loginForm.value.password
    });
  }
  ngOnDestroy(): void {
    if (this.loadingSubs){
      this.loadingSubs.unsubscribe();
    }
  }
}
