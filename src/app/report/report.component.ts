import { Component, OnInit } from '@angular/core';
import { ReportService, Report } from '../report.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
  reports: Report[] = [];
  loading = true;

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.reportService.getAllReports().subscribe({
      next: (data) => {
        this.reports = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
