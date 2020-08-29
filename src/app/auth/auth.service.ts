import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../training/training.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router,
              private AFauth: AngularFireAuth,
              private traningService: TrainingService,
              private snackBar: MatSnackBar) {
  }

  initAuthListener() {
    this.AFauth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.traningService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.AFauth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {

    })
      .catch(error => {
        this.snackBar.open(error.message, null, {duration: 3000});
      });
  }

  login(authData: AuthData) {
    this.AFauth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password)
      .then(result => {

      })
      .catch(error => {
        this.snackBar.open(error.message, null, {duration: 3000});
      });
  }

  logout() {
    this.AFauth.auth.signOut();
  }


  isAuth() {
    return this.isAuthenticated;
  }

}
