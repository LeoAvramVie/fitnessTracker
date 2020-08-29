import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../training/training.service';
import {UiServiceService} from '../shared/ui.service.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../app.reducer';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router,
              private AFauth: AngularFireAuth,
              private traningService: TrainingService,
              private uiService: UiServiceService,
              private store: Store<{ui: fromApp.State}>) {
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
    //this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type: 'START_LOADING'});
    this.AFauth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
     // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch({type: 'STOP_LOADING'});

    })
      .catch(error => {
       // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({type: 'STOP_LOADING'});
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    //this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type: 'START_LOADING'});
    this.AFauth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password)
      .then(result => {
        //this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({type: 'STOP_LOADING'});

      })
      .catch(error => {
        //this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({type: 'STOP_LOADING'});
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  logout() {
    this.AFauth.auth.signOut();
  }


  isAuth() {
    return this.isAuthenticated;
  }

}
