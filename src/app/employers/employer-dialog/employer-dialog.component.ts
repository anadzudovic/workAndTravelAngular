import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { MatDialogRef } from '@angular/material';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { EmployerDialogService } from 'src/app/shared/employer-dialog.service';
import { EmployerDto } from 'src/app/model/employerDto';

@Component({
  selector: 'app-employer-dialog',
  templateUrl: './employer-dialog.component.html',
  styleUrls: ['./employer-dialog.component.css']
})
export class EmployerDialogComponent implements OnInit {
   employer: EmployerDto;
  constructor(private api: ApiService, private service: EmployerDialogService, public dialogRef: MatDialogRef<EmployerDialogComponent>,
              private notif: NotificationsService) { }

  ngOnInit() {
  }
  save() {
    if (this.service.form.valid) {
    this.returnEmployer();
    this.api.saveEmployer(this.employer).subscribe(res => {
      this.notif.succes('Succesfully saved');
    }, err => {
      this.notif.warn('Unsuccesfully saved');
    });
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.close();
  }
  }
  update() {
    if (this.service.form.valid) {
    this.returnEmployer();
    this.api.updateEmployer(this.employer).subscribe(res => {
      this.notif.succes('Succesfully updated');

    }, err => {
      this.notif.warn('Unsuccessfully updated');
    });
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.close();
  }

  }
  clear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
  close() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.service.initializeCityDto();
    this.dialogRef.close();
  }
  returnEmployer() {
    this.employer = {
    employerId: this.service.form.value.employerId,
    name: this.service.form.value.name,
    owner: this.service.form.value.owner,
    description: this.service.form.value.description,
    phoneNumber: this.service.form.value.phoneNumber,
    email: this.service.form.value.email,
    city: this.service.cityDto
    };
  }
}
