import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { EmployersComponent } from './employers/employers.component';
import { DatePipe } from '@angular/common';
import { EmployerDialogComponent } from './employers/employer-dialog/employer-dialog.component';
import { CitiesTableComponent } from './employers/cities-table/cities-table.component';
import { NavigationComponent } from './navigation/navigation.component';
import { JobOffersComponent } from './job-offers/job-offers.component';
import { JobOfferDialogComponent } from './job-offers/job-offer-dialog/job-offer-dialog.component';
import { EmployersTableComponent } from './job-offers/employers-table/employers-table.component';
import { JobsTableComponent } from './job-offers/jobs-table/jobs-table.component';
import { AuthModule } from './auth/auth.module';
import { ApplicationsComponent } from './applications/applications.component';
import { ApplicationDialogComponent } from './applications/application-dialog/application-dialog.component';
import { ApplicationDeleteDialogComponent } from './applications/application-delete-dialog/application-delete-dialog.component';
import { JobOffersClientComponent } from './job-offers-client/job-offers-client.component';
import { JobOffersClientCardComponent } from './job-offers-client/job-offers-client-card/job-offers-client-card.component';
import { SearchBarJobOffersComponent } from './job-offers-client/search-bar-job-offers/search-bar-job-offers.component';
import { JobOfferViewComponent } from './job-offers-client/job-offer-view/job-offer-view.component';
import { ApplicationsClientComponent } from './applications-client/applications-client.component';
import { ApplicationClientDialogComponent } from './applications-client/application-client-dialog/application-client-dialog.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    EmployersComponent,
    EmployerDialogComponent,
    CitiesTableComponent,
    NavigationComponent,
    JobOffersComponent,
    JobOfferDialogComponent,
    EmployersTableComponent,
    JobsTableComponent,
    ApplicationsComponent,
    ApplicationDialogComponent,
    ApplicationDeleteDialogComponent,
    JobOffersClientComponent,
    JobOffersClientCardComponent,
    SearchBarJobOffersComponent,
    JobOfferViewComponent,
    ApplicationsClientComponent,
    ApplicationClientDialogComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule,
    ShowHidePasswordModule,
    FontAwesomeModule
  ],
  entryComponents: [ EmployerDialogComponent, JobOfferDialogComponent,
    ApplicationDeleteDialogComponent, ApplicationDialogComponent, JobOfferViewComponent, ApplicationClientDialogComponent,
    LoginComponent, SignupComponent],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
