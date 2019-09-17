import { Component, OnInit, assertPlatform } from '@angular/core';
import { JobOfferDto } from '../model/jobOfferDto';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-job-offers-client',
  templateUrl: './job-offers-client.component.html',
  styleUrls: ['./job-offers-client.component.css']
})
export class JobOffersClientComponent implements OnInit {
  jobOffers: JobOfferDto[];
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAllJobOffers().subscribe(
      resp  => {
        this.jobOffers = resp;
      }, err => {
      alert('ERROR HAS OCCURED');
      });
  }
  updateSearch(jobOffers: JobOfferDto[]) {
    console.log(jobOffers);
    this.jobOffers = jobOffers;
  }
}
