import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Token } from '@angular/compiler';
import { config } from '../config';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserProfile } from '../model/userProfile';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser: string;
  public userProfile: UserProfile;

  constructor(private http: HttpClient, private router: Router, private service: ApiService) { }

  login(username: string, password: string) {
    const contentHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.service.login(username, password, contentHeader);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  doLoginUser(loggedUser: string, token: string) {
    this.loggedUser = loggedUser;
    this.storeToken(token);
  }

  storeToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  storeUserProfile(userProfile: UserProfile) {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }
  // getUserProfile() {
  //  const userCredentials = JSON.parse(localStorage.getItem('userProfile'));
  // }

  getJwtToken(): string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

}
