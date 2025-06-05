import { Component, OnInit } from '@angular/core';
import { ReportService, Report } from '../report.service';
import { CommonModule } from '@angular/common';import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
  reports: Report[] = [];
  loading = true;

  showGenerateCard = false;
  generateEmployeeId: number | null = null;
  generatedReport: Report | null = null;
  generateError: string = '';

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

  toggleGenerateCard() {
    this.showGenerateCard = !this.showGenerateCard;
    this.generatedReport = null;
    this.generateError = '';
  }

  generateReport() {
    this.generateError = '';
    if (!this.generateEmployeeId) return;
    this.reportService.generateReportByEmployeeId(this.generateEmployeeId).subscribe({
      next: () => {
        this.getAllReports(); // Refresh the table
        this.showGenerateCard = false; // Optionally hide the card after generation
        this.generateEmployeeId = null;
      },
      error: () => {
        this.generateError = 'Report generation failed or employee not found.';
      }
    });
  }
  
  // Add this helper if not present
  getAllReports() {
    this.loading = true;
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