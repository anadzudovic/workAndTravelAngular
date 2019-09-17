import { Injectable } from '@angular/core';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  config: MatSnackBarConfig = {
    duration: 2000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };
  constructor(public snackBar: MatSnackBar) { }
  succes(msg) {
    this.config.panelClass = ['notification', 'success'];
    this.snackBar.open(msg, '', this.config);
  }
  warn(msg) {
    this.config.panelClass = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }
}
