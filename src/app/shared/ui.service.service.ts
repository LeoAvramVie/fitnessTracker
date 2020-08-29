import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {


  constructor(private snackBar: MatSnackBar) {
  }

  showSnackBar(massage, action, duration) {
    this.snackBar.open(massage, action, { duration});
  }
}
