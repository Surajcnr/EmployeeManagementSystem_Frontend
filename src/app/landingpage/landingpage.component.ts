import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { EmployeeService } from '../employee.service';
import { PerformanceService } from '../performance.service';
import { FeedbackService } from '../feedback.service';
import { ReportService } from '../report.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'landingpage',
  imports: [FooterComponent, CommonModule],
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  employeeCount: number = 0;
  reviewCount: number = 0;
  feedbackCount: number = 0;
  reportCount: number = 0;

  constructor(
    private employeeService: EmployeeService,
    private performanceService: PerformanceService,
    private feedbackService: FeedbackService,
    private reportService: ReportService
  ) {}

  get isLoggedIn(): boolean {
    return !!sessionStorage.getItem('jwt');
  }

  ngOnInit() {
    if (this.isLoggedIn) {
      this.fetchCounts();
    }
  }

  fetchCounts() {
    this.employeeService.getAllEmployees().subscribe((employees) => {
      this.animateCount('employeeCount', employees.length);
    });

    this.performanceService.getAllReviews().subscribe((reviews) => {
      this.animateCount('reviewCount', reviews.length);
    });

    this.feedbackService.getAllFeedbacks().subscribe((feedbacks) => {
      this.animateCount('feedbackCount', feedbacks.length);
    });

    this.reportService.getAllReports().subscribe((reports) => {
      this.animateCount('reportCount', reports.length);
    });
  }

  animateCount(
    property: 'employeeCount' | 'reviewCount' | 'feedbackCount' | 'reportCount',
    targetValue: number
  ) {
    let currentValue = 0;
    const interval = setInterval(() => {
      if (currentValue < targetValue) {
        currentValue++;
        this[property] = currentValue;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust the speed of animation by changing the interval time
  }
}
