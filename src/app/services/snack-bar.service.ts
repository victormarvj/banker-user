import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 5;

  constructor() {}

  success(message: any) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
      data: {
        message: message,
        color: 'success',
      },
    });
  }

  error(message: any) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
      data: {
        message: message,
        color: 'danger',
      },
    });
  }
}
