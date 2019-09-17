import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JobOfferDto } from '../model/jobOfferDto';

@Injectable({
  providedIn: 'root'
})
export class JobOfferClientViewService {
  jobOffer: JobOfferDto;

  form: FormGroup = new FormGroup({
    hourlyWage: new FormControl(''),
    description: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    tips: new FormControl(false),
    overTime: new FormControl(false),
    employerName: new FormControl(''),
    jobTitle: new FormControl(''),
    jobDescription: new FormControl(''),

    city: new FormControl(''),
    state: new FormControl('')
  });
  constructor() {

   }
  initializeFormGroup() {
    this.form.setValue({
      hourlyWage: 0,
      description: '',
      fromDate: '',
      toDate: '',
      tips: false,
      overTime: false,
      employerName: '',
      jobTitle: '',
      jobDescription: '',
      city: '',
      state: ''

    });
  }
  initializeJobOffer() {
    this. jobOffer = null;
  }
  populateForm(jobOffer) {
    this.form.setValue({

      hourlyWage: jobOffer.hourlyWage,
      description: jobOffer.description,
      fromDate: jobOffer.fromDate,
      toDate: jobOffer.toDate,
      tips: jobOffer.tips,
      overTime: jobOffer.overTime,
      employerName: jobOffer.employer.name,
      jobTitle: jobOffer.job.title,
      jobDescription: jobOffer.job.description,
      city: jobOffer.employer.city.name,
      state: jobOffer.employer.city.state.name

    });
  }
  populateJobOffer(jobOffer) {
    this.jobOffer = jobOffer;
  }

  view(jobOffer) {
    this.populateForm(jobOffer);
    this.populateJobOffer(jobOffer);

  }
}
