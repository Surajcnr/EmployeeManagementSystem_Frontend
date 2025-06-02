import { Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginPageComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { PerformanceComponent } from './performance/performance.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ReportComponent } from './report/report.component';

export const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'performance', component: PerformanceComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'report', component: ReportComponent },
  { path: '**', redirectTo: '' }
];
