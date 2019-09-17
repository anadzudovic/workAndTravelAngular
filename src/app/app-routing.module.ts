import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { EmployersComponent } from './employers/employers.component';
import { JobOffersComponent } from './job-offers/job-offers.component';
import { ApplicationsComponent } from './applications/applications.component';
import { JobOffersClientComponent } from './job-offers-client/job-offers-client.component';
import { ApplicationsClientComponent } from './applications-client/applications-client.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'jobOffers',
    component: JobOffersComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
  path: 'employers',
  component: EmployersComponent
},
{
  path: 'applications',
  component: ApplicationsComponent
},
{
  path: 'jobOffersClient',
  component: JobOffersClientComponent
},
{
  path: 'applicationsClient',
  component: ApplicationsClientComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
