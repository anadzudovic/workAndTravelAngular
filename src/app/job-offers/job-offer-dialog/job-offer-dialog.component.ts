import { Component, OnInit } from '@angular/core';
import { JobOfferDto } from 'src/app/model/jobOfferDto';
import { ApiService } from 'src/app/shared/api.service';
import { JobOfferDialogService } from 'src/app/shared/job-offer-dialog.service';
import { MatDialogRef } from '@angular/material';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-job-offer-dialog',
  templateUrl: './job-offer-dialog.component.html',
  styleUrls: ['./job-offer-dialog.component.css']
})
export class JobOfferDialogComponent implements OnInit {
  jobOffer: JobOfferDto;
  constructor(private api: ApiService, private service: JobOfferDialogService, public dialogRef: MatDialogRef<JobOfferDialogComponent>,
              private notif: NotificationsService, private datePipe: DatePipe) { }

  ngOnInit() {
  }
  save() {
    this.returnJobOffer();
    this.api.saveJobOffer(this.jobOffer).subscribe(res => {
      this.notif.succes('Succesfully saved');
    }, err => {
      this.notif.warn('Unsuccesfully saved');
    });
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.close();
  }
  update() {
    this.returnJobOffer();

    this.api.updateJobOffer(this.jobOffer, this.jobOffer.jobOfferId.toString()).subscribe(res => {
      this.notif.succes('Succesfully updated');

    }, err => {
      this.notif.warn('Unsuccessfully updated');
    });
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.close();
  }
  clear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
  close() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.service.initializeEmployer();
    this.service.initializeJob();
    this.dialogRef.close();
  }
  returnJobOffer() {
    this.service.form.value.fromDate = this.datePipe.transform(this.service.form.value.fromDate, 'yyyy-MM-dd');
    this.service.form.value.toDate = this.datePipe.transform(this.service.form.value.toDate, 'yyyy-MM-dd');
    this.jobOffer = {
    jobOfferId: this.service.form.value.jobOfferId,
    description: this.service.form.value.description,
    hourlyWage: this.service.form.value.hourlyWage,
    tips: this.service.form.value.tips,
    overTime: this.service.form.value.overTime,
    fromDate: this.service.form.value.fromDate,
    toDate: this.service.form.value.toDate,
    employer: this.service.employerDto,
    job: this.service.jobDto
    };
  }
}
