import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApplicationDto } from '../model/applicationDto';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDialogClientService {
  application: ApplicationDto;

  form: FormGroup = new FormGroup({
    date: new FormControl(''),
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
      date: '',
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
  initializeApplication() {
    this. application = null;
  }
  populateForm(application) {
    this.form.setValue({
      date: application.creationDate,
      hourlyWage: application.jobOffer.hourlyWage,
      description: application.jobOffer.description,
      fromDate: application.jobOffer.fromDate,
      toDate: application.jobOffer.toDate,
      tips: application.jobOffer.tips,
      overTime: application.jobOffer.overTime,
      employerName: application.jobOffer.employer.name,
      jobTitle: application.jobOffer.job.title,
      jobDescription: application.jobOffer.job.description,
      city: application.jobOffer.employer.city.name,
      state: application.jobOffer.employer.city.state.name

    });
  }
  populateApplication(application) {
    this.application = application;
  }

  view(application) {
    this.populateForm(application);
    this.populateApplication(application);

  }
}
