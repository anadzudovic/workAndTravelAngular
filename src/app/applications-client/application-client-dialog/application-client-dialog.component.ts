import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ApplicationDialogClientService } from 'src/app/shared/application-dialog-client-service.service';

@Component({
  selector: 'app-application-client-dialog',
  templateUrl: './application-client-dialog.component.html',
  styleUrls: ['./application-client-dialog.component.css']
})
export class ApplicationClientDialogComponent implements OnInit {

  constructor(private service: ApplicationDialogClientService, public dialogRef: MatDialogRef<ApplicationClientDialogComponent>) { }

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
