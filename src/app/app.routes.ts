import { Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginPageComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { PerformanceComponent } from './performance/performance.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ReportComponent } from './report/report.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'employee', component: EmployeeComponent, canActivate: [authGuard] },
  { path: 'performance', component: PerformanceComponent, canActivate: [authGuard] },
  { path: 'feedback', component: FeedbackComponent, canActivate: [authGuard] },
  { path: 'report', component: ReportComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
