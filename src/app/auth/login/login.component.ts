import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UiServiceService} from '../../shared/ui.service.service';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  loadingSubs = new Subscription();


  constructor(private authService: AuthService,
              private uiService: UiServiceService,
              private store: Store<fromRoot.State>) {
  }


  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

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
}
