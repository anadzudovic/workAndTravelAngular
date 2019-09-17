import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDialogService {


  form: FormGroup = new FormGroup({
    applicationId: new FormControl(''),
    date: new FormControl(''),
    jobOfferId:  new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    employerId: new FormControl(''),
    employerName: new FormControl(''),
    employerEmail: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    job: new FormControl(''),
    jobId:  new FormControl(''),
    clientId:  new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    jmbg: new FormControl(''),
    clientEmail: new FormControl(''),
    clientPhoneNumber: new FormControl(''),


  });
  constructor() {

   }
  initializeFormGroup() {
    this.form.setValue({
      applicationId: '',
      date: '',
      jobOfferId:  '',
      fromDate: '',
      toDate: '',
      employerId: '',
      employerName: '',
      employerEmail: '',
      city: '',
      state: '',
      job: '',
      jobId:  '',
      clientId: '',
      firstName: '',
      lastName: '',
      jmbg: '',
      clientEmail: '',
      clientPhoneNumber: ''
    });
  }
  populateForm(application) {
    this.form.setValue({
      applicationId: application.applicationId,
      date: application.creationDate,
      jobOfferId:  application.jobOffer.jobOfferId,
      fromDate: application.jobOffer.fromDate,
      toDate: application.jobOffer.toDate,
      employerId: application.jobOffer.employer.employerId,
      employerName: application.jobOffer.employer.name,
      employerEmail: application.jobOffer.employer.email,
      city: application.jobOffer.employer.city.name,
      state: application.jobOffer.employer.city.state.name,
      job: application.jobOffer.job.title,
      jobId:  application.jobOffer.job.jobId,
      clientId: application.client.personId,
      firstName: application.client.firstName,
      lastName: application.client.lastName,
      jmbg: application.client.jmbg,
      clientEmail: application.client.email,
      clientPhoneNumber: application.client.phoneNumber

    });
  }

  view(row: any) {

    this.populateForm(row);

  }
}
