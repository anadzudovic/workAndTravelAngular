import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmployerDto } from '../model/employerDto';
import { JobDto } from '../model/jobDto';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class JobOfferDialogService {
  createJobOffer = false;
  updateJobOffer = false;
  viewJobOffer = false;
  selectEmployer = new BehaviorSubject<any>(null);
  selectJob = new BehaviorSubject<any>(null);
  employerDto: EmployerDto;
  jobDto: JobDto;
  regexPattern = '^-?[0-9]\\d*(\\.\\d{1,2})?$';


  form: FormGroup = new FormGroup({
    jobOfferId:  new FormControl(''),
    hourlyWage: new FormControl('', [Validators.required, Validators.pattern(this.regexPattern)]),
    description: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    tips: new FormControl(false),
    overTime: new FormControl(false),
    employer: new FormControl('', Validators.required),
    job: new FormControl('', Validators.required),
    jobId: new FormControl('', Validators.required),
    employerId: new FormControl('', Validators.required),
    city: new FormControl(''),
    state: new FormControl('')
  });
  constructor() {
    this.selectEmployer.asObservable().subscribe((data) => {
      this.employerDto = data;
      if (this.employerDto != null) {
      this.form.patchValue({
       employer: data.name,
       employerId: data.employerId,
       city: data.city.name,
       state: data.city.state.name}
      );
    }
    });
    this.selectJob.asObservable().subscribe((data) => {
      this.jobDto = data;
      if (this.jobDto != null) {
      this.form.patchValue({
       job: data.title,
      jobId: data.jobId}
      );
    }
    });

   }
  initializeFormGroup() {
    this.form.setValue({
      jobOfferId:  '',
      hourlyWage: 0,
      description: '',
      fromDate: '',
      toDate: '',
      tips: false,
      overTime: false,
      employer: '',
      job: '',
      jobId: '',
      employerId: '',
      city: '',
      state: ''

    });
  }
  initializeJob() {
    this. jobDto = null;
  }
  initializeEmployer() {
    this. employerDto = null;
  }
  populateForm(jobOffer) {
    this.form.setValue({
      jobOfferId: jobOffer.jobOfferId,
      hourlyWage: jobOffer.hourlyWage,
      description: jobOffer.description,
      fromDate: jobOffer.fromDate,
      toDate: jobOffer.toDate,
      tips: jobOffer.tips,
      overTime: jobOffer.overTime,
      employer: jobOffer.employer.name,
      job: jobOffer.job.title,
      jobId: jobOffer.job.jobId,
      employerId: jobOffer.employer.employerId,
      city: jobOffer.employer.city.name,
      state: jobOffer.employer.city.state.name

    });
  }
  populateJob(row) {
    this.jobDto = {
      jobId: row.job.jobId,
      title: row.job.title,
      description: row.job.description
    };
  }
  populateEmployer(row) {
    this.employerDto = {
      employerId: row.employer.employerId,
      name: row.employer.name,
      owner: row.employer.owner,
      description: row.employer.description,
      phoneNumber: row.employer.phoneNumber,
      email: '',
      city: {
        cityId: row.employer.city.cityId,
        name: row.employer.city.name,
        state: {
          stateId: row.employer.city.state.stateId,
          name: row.employer.city.state.name
        }
      }
    };
  }
  view(row: any) {
    this.createJobOffer = false;
    this.viewJobOffer = true;
    this.updateJobOffer = false;
    this.populateForm(row);
    this.populateJob(row);
    this.populateEmployer(row);

  }
  update(row: any) {
    this.createJobOffer = false;
    this.viewJobOffer = false;
    this.updateJobOffer = true;
    this.populateForm(row);
    this.populateJob(row);
    this.populateEmployer(row);
  }
  create() {
    this.createJobOffer  = true;
    this.viewJobOffer  = false;
    this.updateJobOffer  = false;
  }
  minDate() {
    if (this.form.getRawValue().fromDate === '') {
     return   new Date(1900, 0, 1);
    } else {
      return this.form.getRawValue().fromDate;
    }
  }
}
