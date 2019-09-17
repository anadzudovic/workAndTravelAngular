import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JobOfferDto } from 'src/app/model/jobOfferDto';

import { StateDto } from 'src/app/model/stateDto';
import { JobDto } from 'src/app/model/jobDto';
import { ApiService } from 'src/app/shared/api.service';
import { HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-search-bar-job-offers',
  templateUrl: './search-bar-job-offers.component.html',
  styleUrls: ['./search-bar-job-offers.component.css']
})
export class SearchBarJobOffersComponent implements OnInit {
  state = {
    stateId: 0,
    name: '',

  };
  job = {
    jobId: 0,
    title: '',
    description: ''
  };
  fromDate;
  toDate;
  tips = false;
  states: StateDto[];
  jobs: JobDto[];
  constructor(private api: ApiService, private datePipe: DatePipe) { }
  @Input() jobOffers: JobOfferDto[];
  @Output() searchEvent: EventEmitter<JobOfferDto[]> = new EventEmitter<JobOfferDto[]>();
  ngOnInit() {
    this.getAllJobs();
    this.getAllStates();
  }
  search() {
    if (typeof this.state.stateId === 'undefined') {
      this.state.stateId = 0;
    }
    if (typeof this.job.jobId === 'undefined') {
      this.job.jobId = 0;
    }
    this.fromDate = this.datePipe.transform(this.fromDate, 'yyyy-MM-dd');
    this.toDate = this.datePipe.transform(this.toDate, 'yyyy-MM-dd');
    let params = new HttpParams().set('stateId', this.state.stateId + '').
    set('fromDate', this.fromDate + '').set('toDate', this.toDate).set('jobId', this.job.jobId + '')
    .set('tips', this.tips.toString());
    if ( this.fromDate === null) {
      params = params.delete('fromDate');
    }
    if ( this.toDate === null) {
      params = params.delete('toDate');
    }
    this.api.searchJobOffers(params).subscribe(res => {
      this.jobOffers = res ;
      console.log(this.jobOffers);
      this.searchEvent.emit(this.jobOffers);
    });
  }
  getAllStates() {
    this.api.getAllStates().subscribe(
      res => {
        res.sort((a, b) => a.name.localeCompare(b.name));
        this.states = res;

      },
      err => {
        alert('ERROR HAS OCCURED');
      }

    );

  }
  getAllJobs() {
    this.api.getAllJobs().subscribe(
      res => {
        res.sort((a, b) => a.title.localeCompare(b.title));
        this.jobs = res;

      },
      err => {
        alert('ERROR HAS OCCURED');
      }

    );

  }
  minDate() {
    if (typeof this.fromDate === 'undefined' || this.fromDate === '') {
     return   new Date(1900, 0, 1);
    } else {
      return this.fromDate;
    }
  }

}
