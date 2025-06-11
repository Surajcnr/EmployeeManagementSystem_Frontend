import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { EmployeeService } from '../employee.service';
import { PerformanceService } from '../performance.service';
import { FeedbackService } from '../feedback.service';
import { ReportService } from '../report.service';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'landingpage',
  imports: [FooterComponent, CommonModule],
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
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
      this.initializeCharts();
    }
  }

  initializeCharts() {
    this.employeeService.getAllEmployees().subscribe((employees) => {
      this.createChart('employeeChart', employees.length, 'Employees');
    });

    this.performanceService.getAllReviews().subscribe((reviews) => {
      this.createChart('performanceChart', reviews.length, 'Reviews');
    });

    this.feedbackService.getAllFeedbacks().subscribe((feedbacks) => {
      this.createChart('feedbackChart', feedbacks.length, 'Feedbacks');
    });

    this.reportService.getAllReports().subscribe((reports) => {
      this.createChart('reportChart', reports.length, 'Reports');
    });
  }

  createChart(chartId: string, data: number, label: string) {
    new Chart(chartId, {
      type: 'doughnut',
      data: {
        labels: [label, 'Remaining'], // Update the legend text here
        datasets: [
          {
            data: [data, 100 - data],
            backgroundColor: ['#0066CC', '#e0e0e0'], // Change the green color (#4caf50) to a new color (#ff5733)
          }
        ]
      },
      options: {
        responsive: true,
        animation: {
          animateScale: true
        },
        plugins: {
          legend: {
            labels: {
              color: '#000000', // Optional: Change legend text color
            }
          }
        }
      }
    });
  }
}
