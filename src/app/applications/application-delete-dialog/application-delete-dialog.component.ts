import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-application-delete-dialog',
  templateUrl: './application-delete-dialog.component.html',
  styleUrls: ['./application-delete-dialog.component.css']
})
export class ApplicationDeleteDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<ApplicationDeleteDialogComponent>) { }

  ngOnInit() {
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
