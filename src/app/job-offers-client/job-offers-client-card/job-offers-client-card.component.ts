import { Component, OnInit, Input } from '@angular/core';
import { JobOfferDto } from 'src/app/model/jobOfferDto';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { JobOfferClientViewService } from 'src/app/shared/job-offer-client-view.service';
import { JobOfferViewComponent } from '../job-offer-view/job-offer-view.component';
import { ApiService } from 'src/app/shared/api.service';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
import { ElementSchemaRegistry } from '@angular/compiler';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-job-offers-client-card',
  templateUrl: './job-offers-client-card.component.html',
  styleUrls: ['./job-offers-client-card.component.css']
})
export class JobOffersClientCardComponent implements OnInit {
 @Input() jobOffer: JobOfferDto;
  applied = false;
  admin = false;
  constructor(private service: JobOfferClientViewService, private dialog: MatDialog,
              private api: ApiService, private notif: NotificationsService, private auth: AuthService) { }

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
  view() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.service.view(this.jobOffer);
    this.dialog.open(JobOfferViewComponent, dialogConfig);
}
apply() {
  this.api.saveApplication(this.jobOffer).subscribe(res => {
    this.notif.succes('Succesfully saved job application');
    this.sleep(2000).then(() => {
     location.reload();
      });

  }, err => {
    this.notif.warn(err.error.message);
  });
}
prepare() {
  this.api.getAllApplications().subscribe(
    res => {
      const userProfile = JSON.parse(localStorage.getItem('userProfile'));
      const clientId = userProfile.person.personId;
      res.forEach(element => {
        if (element.client.personId === clientId && element.jobOffer.jobOfferId === this.jobOffer.jobOfferId) {
          this.applied = true;
        }
      });

    },
    err => {
      alert('ERROR HAS OCCURED');
    }

  );
}
sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
}
