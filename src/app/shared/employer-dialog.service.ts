import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CityDto } from '../model/cityDto';

@Injectable({
  providedIn: 'root'
})
export class EmployerDialogService {
  createEmployer = false;
  updateEmployer = false;
  viewEmployer = false;
  subject = new BehaviorSubject<any>(null);
  cityDto: CityDto;

  form: FormGroup = new FormGroup({
    employerId:  new FormControl(''),
    name: new FormControl('', Validators.required),
    owner: new FormControl(''),
    description: new FormControl(''),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9 ]*')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required)
  });
  constructor() {
    this.subject.asObservable().subscribe((data) => {
      this.cityDto = data;
      if (this.cityDto != null) {
      this.form.patchValue({
       city: data.name,
      state: data.state.name}
      );
    }
    });
   }
  initializeFormGroup() {
    this.form.setValue({
      employerId: '',
      name: '',
      owner: '',
      description: '',
      phoneNumber: '',
      email: '',
      city: '',
      state: ''

    });
  }
  initializeCityDto() {
    this. cityDto = null;
  }
  populateForm(employer) {
    this.form.setValue({
      employerId: employer.employerId,
      name: employer.name,
      owner: employer.owner,
      description: employer.description,
      phoneNumber: employer.phoneNumber,
      email: employer.email,
      city: employer.city.name,
      state: employer.city.state.name

    });
  }
  populateCity(row) {
    this.cityDto = {
    cityId: row.city.cityId,
    name: row.city.name,
    state: {
      stateId: row.city.state. stateId,
      name: row.city.state.name
    }

    };
  }
  view(row: any) {
    this.createEmployer = false;
    this.viewEmployer = true;
    this.updateEmployer = false;
    this.populateForm(row);
    this.populateCity(row);

  }
  update(row: any) {
    this.createEmployer = false;
    this.viewEmployer = false;
    this.updateEmployer = true;
    this.populateForm(row);
    this.populateCity(row);
  }
  create() {
    this.createEmployer = true;
    this.viewEmployer = false;
    this.updateEmployer = false;
  }
}
