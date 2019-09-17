import { Component, OnInit } from '@angular/core';
import { ApplicationDialogService } from 'src/app/shared/application-dialog.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-application-dialog',
  templateUrl: './application-dialog.component.html',
  styleUrls: ['./application-dialog.component.css']
})
export class ApplicationDialogComponent implements OnInit {

  constructor(private service: ApplicationDialogService, public dialogRef: MatDialogRef<ApplicationDialogComponent>) { }

  ngOnInit() {
  }
  clear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
  close() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
