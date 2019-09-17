import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatDialogRef } from '@angular/material';
import { NotificationsService } from 'src/app/shared/notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService,
              private dialogRef: MatDialogRef<LoginComponent>, private notif: NotificationsService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  get f() { return this.form.controls; }

  login() {
    if (this.form.valid) {
    this.authService.login(this.f.username.value, this.f.password.value).subscribe(
      (resp) => {
        console.log(resp);
        this.authService.storeToken(resp.headers.get('Authorization').slice(7));
        this.authService.storeUserProfile(resp.body);
        this.authService.userProfile = JSON.parse(localStorage.getItem('userProfile'));
        this.notif.succes('Log in succesful');
        this.sleep(2000).then(() => {
          location.reload();
          this.close();
        });
      },
      (err) => {
        console.log(err);
        this.notif.warn('Wrong username or password!');
      }
    );
    }
}
sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
close() {
  this.dialogRef.close();
}
}
