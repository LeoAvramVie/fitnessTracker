import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  public loadingStateChanged = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar) {
  }

  showSnackBar(massage, action, duration) {
    this.snackBar.open(massage, action, { duration});
  }
}
