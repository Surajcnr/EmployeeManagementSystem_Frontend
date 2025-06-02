import { Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginPageComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '**', redirectTo: '' }
];
