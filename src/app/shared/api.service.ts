import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployerDto } from '../model/employerDto';
import { CityDto } from '../model/cityDto';
import { JobOfferDto } from '../model/jobOfferDto';
import { JobDto } from '../model/jobDto';
import { UserProfile } from '../model/userProfile';
import { config } from '../config';
import { ApplicationDto } from '../model/applicationDto';
import { StateDto } from '../model/stateDto';
import { ApplicationDeleteDialogComponent } from '../applications/application-delete-dialog/application-delete-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private GET_ALL_EMPLOYERS_URL = `${config.apiUrl}/employers`;
  private DELETE_EMPLOYER_URL = `${config.apiUrl}/employers/delete/`;
  private SAVE_EMPLOYER_URL = `${config.apiUrl}/employers/save`;
  private UPDATE_EMPLOYER_URL = `${config.apiUrl}/employers/update`;
  private GET_ALL_CITIES_URL = `${config.apiUrl}/cities`;
  private GET_ALL_JOB_OFFERS_URL = `${config.apiUrl}/joboffers`;
  private DELETE_JOB_OFFER_URL = `${config.apiUrl}/joboffers/delete/`;
  private SAVE_JOB_OFFER_URL = `${config.apiUrl}/joboffers/save`;
  private UPDATE_JOB_OFFER_URL = `${config.apiUrl}/joboffers/update/`;
  private GET_ALL_JOBS_URL = `${config.apiUrl}/jobs`;
  private LOGIN_URL = `${config.apiUrl}/login`;
  private GET_ALL_APPLICATIONS_URL = `${config.apiUrl}/applications`;
  private SAVE_APPLICATION_URL = `${config.apiUrl}/applications/save`;
  private DELETE_APPLICATION_URL = `${config.apiUrl}/applications/delete/`;
  private SEARCH_JOB_OFFERS_URL = `${config.apiUrl}/joboffers/search`;
  private GET_ALL_STATES_URL = `${config.apiUrl}/states`;
  private SIGNUP_URL = `${config.apiUrl}/signup`;

  userProfile: UserProfile;

  constructor(private http: HttpClient) { }

  login(username: string, password: string, contentHeader: HttpHeaders): Observable<any> {
    return this.http.post<any>(this.LOGIN_URL, { username, password }, { headers: contentHeader, observe: 'response' });
  }
  signup(dto: UserProfile): Observable<UserProfile> {
    return this.http.post<any>(this.SIGNUP_URL, dto);
  }

  getAllEmployers(): Observable<EmployerDto[]> {
    return this.http.get<EmployerDto[]>(this.GET_ALL_EMPLOYERS_URL);
  }
  deleteEmployer(id: string): Observable<any> {
    return this.http.delete(this.DELETE_EMPLOYER_URL + id);
  }
  saveEmployer(dto: EmployerDto): Observable<EmployerDto> {
    return this.http.post<EmployerDto>(this.SAVE_EMPLOYER_URL, dto);
  }
  updateEmployer(dto: EmployerDto): Observable<EmployerDto> {
    return this.http.put<EmployerDto>(this.UPDATE_EMPLOYER_URL, dto);
  }
  getAllCities(): Observable<CityDto[]> {

    return this.http.get<CityDto[]>(this.GET_ALL_CITIES_URL);
  }
  getAllStates(): Observable<StateDto[]> {

    return this.http.get<StateDto[]>(this.GET_ALL_STATES_URL);
  }

  getAllJobOffers(): Observable<JobOfferDto[]> {
    return this.http.get<JobOfferDto[]>(this.GET_ALL_JOB_OFFERS_URL);
  }
  deleteJobOffer(id: string): Observable<any> {
    return this.http.delete(this.DELETE_JOB_OFFER_URL + id);
  }
  saveJobOffer(dto: JobOfferDto): Observable<JobOfferDto> {
    return this.http.post<JobOfferDto>(this.SAVE_JOB_OFFER_URL, dto);
  }
  updateJobOffer(dto: JobOfferDto, id: string): Observable<JobOfferDto> {
    return this.http.put<JobOfferDto>(this.UPDATE_JOB_OFFER_URL + id, dto);
  }
  getAllJobs(): Observable<JobDto[]> {
    return this.http.get<JobDto[]>(this.GET_ALL_JOBS_URL);
  }
  getAllApplications(): Observable<ApplicationDto[]> {
    return this.http.get<ApplicationDto[]>(this.GET_ALL_APPLICATIONS_URL);
  }
  deleteApplication(id: string): Observable<any> {
    return this.http.delete(this.DELETE_APPLICATION_URL + id);
  }
  saveApplication(dto: JobOfferDto): Observable<ApplicationDto> {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    console.log(userProfile);
    const clientDto = userProfile.person;
    console.log(clientDto);
    console.log(dto);
    const applicationDto = {
      applicationId: 0,
      date: null,
      client: clientDto,
      jobOffer: dto,
    };
    console.log(applicationDto);
    return this.http.post<ApplicationDto>(this.SAVE_APPLICATION_URL, applicationDto);
  }
  searchJobOffers(params: HttpParams): Observable<JobOfferDto[]> {
    return this.http.get<JobOfferDto[]>(this.SEARCH_JOB_OFFERS_URL, { params });
  }

}
