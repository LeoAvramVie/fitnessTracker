import {AuthData} from './auth-data.model';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../training/training.service';
import {UiServiceService} from '../shared/ui.service.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {

  constructor(private router: Router,
              private AFauth: AngularFireAuth,
              private traningService: TrainingService,
              private uiService: UiServiceService,
              private store: Store<fromRoot.State>) {
  }

  initAuthListener() {
    this.AFauth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        // this.isAuthenticated = true;
        // this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.traningService.cancelSubscriptions();
        this.store.dispatch(new Auth.SetUnauthenticated());
        // this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.AFauth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
     // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());

    })
      .catch(error => {
       // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.AFauth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());

      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  logout() {
    this.AFauth.auth.signOut();
  }
}
