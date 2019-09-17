import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NotificationsService } from 'src/app/shared/notifications.service';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { ApiService } from 'src/app/shared/api.service';
import { UserProfile } from 'src/app/model/userProfile';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  userProfile: UserProfile;
  constructor(private formBuilder: FormBuilder, private router: Router, private api: ApiService,
              private dialogRef: MatDialogRef<SignupComponent>, private notif: NotificationsService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      JMBG: new FormControl('', [Validators.required, Validators.maxLength(13), Validators.minLength(13)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9 ]*')]),
    });
  }

  get f() { return this.form.controls; }

 signup() {
   if (this.form.valid) {
   this.createObject();
   this.api.signup(this.userProfile).subscribe(
      (resp) => {
        console.log(resp);
        this.notif.succes('Sign up succesful');
        this.sleep(2000).then(() => {
        this.close();
        this.openLogInDialog();
        });
      },
      (err) => {
        console.log(err);
        this.notif.warn(err.error.message);
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
createObject() {
this.userProfile = {
username: this.f.username.value,
password: this.f.password.value,
roles: 'CLIENT',
person: {
  personId: 0,
  firstName: this.f.firstName.value,
  lastName: this.f.lastName.value,
  jmbg: this.f.JMBG.value,
  email: this.f.email.value,
  phoneNumber: this.f.phoneNumber.value
}

};

}
openLogInDialog() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '50%';
  this.dialog.open(LoginComponent, dialogConfig);
}
}
