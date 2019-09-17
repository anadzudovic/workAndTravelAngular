import { Component, OnInit } from '@angular/core';
import { JobOfferClientViewService } from 'src/app/shared/job-offer-client-view.service';
import { MatDialogRef } from '@angular/material';
import { ApiService } from 'src/app/shared/api.service';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-job-offer-view',
  templateUrl: './job-offer-view.component.html',
  styleUrls: ['./job-offer-view.component.css']
})
export class JobOfferViewComponent implements OnInit {
  applied = false;
  admin = false;
  constructor( private api: ApiService, private notif: NotificationsService, private service: JobOfferClientViewService,
               public dialogRef: MatDialogRef<JobOfferViewComponent>, private auth: AuthService) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      if (JSON.parse(localStorage.getItem('userProfile')).roles === 'CLIENT') {
        this.admin = false;
        this.prepare();
      } else {
        this.admin = true;

      }
    } else {
      this.admin = true;

    }
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
  apply() {
    this.api.saveApplication(this.service.jobOffer).subscribe(res => {
      this.notif.succes('Succesfully saved job application');
    }, err => {
      this.notif.warn(err.error.message);
    });
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.close();
    this.sleep(2000).then(() => {
      location.reload();
       });


  }
  prepare() {
    this.api.getAllApplications().subscribe(
      res => {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        const clientId = userProfile.person.personId;
        res.forEach(element => {
          if (element.client.personId === clientId && element.jobOffer.jobOfferId === this.service.jobOffer.jobOfferId) {
            this.applied = true;
          }
        });

      },
      err => {
        console.log(err);
        alert('ERROR HAS OCCURED');
      }

    );

}
sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

}
