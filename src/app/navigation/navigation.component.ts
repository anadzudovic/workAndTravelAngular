import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../model/userProfile';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  userProfile: UserProfile = JSON.parse(localStorage.getItem('userProfile'));
  logIn = true;
  admin = false;
  client = false;
  constructor( private dialog: MatDialog, private router: Router ) { }

  ngOnInit() {
    this.prepareNavBar();
  }
  prepareNavBar() {
    if (this.userProfile === null) {
      this.logIn = true;
      return;
    }
    if (this.userProfile.roles === 'ADMIN') {
      this.admin = true;
      this.logIn = false;
      return;
    }
    if (this.userProfile.roles === 'CLIENT') {
      this.logIn = false;
      this.client = true;
      return;
    }
  }
  logout() {

    localStorage.clear();
    if(this.router.url === '/home' || this.router.url === ''){
      location.reload();
    } else {
      this.router.navigate(['/home']);
    }
  }
  login() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(LoginComponent, dialogConfig);
  }
  signup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(SignupComponent, dialogConfig);
  }

}
