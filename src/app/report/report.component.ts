import { Component, OnInit } from '@angular/core';
import { ReportService, Report } from '../report.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reports: Report[] = [];
  loading = true;

  // Generate Report variables
  showGenerateCard = false;
  generateEmployeeId: number | null = null;
  generateError: string = '';

  // Search Report variables
  showSearchCard = false;
  searchReportId: number | null = null;
  searchResult: Report | null = null;
  searchError: string = '';

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.getAllReports();
  }

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

  toggleGenerateCard() {
    this.showGenerateCard = !this.showGenerateCard;
    // Reset generate form values
    this.generateEmployeeId = null;
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

  toggleSearchCard() {
    this.showSearchCard = !this.showSearchCard;
    // Reset search form values
    this.searchReportId = null;
    this.searchResult = null;
    this.searchError = '';
  }

  searchReport() {
    this.searchError = '';
    this.searchResult = null;
    if (this.searchReportId == null) return;
    this.reportService.searchReportById(this.searchReportId).subscribe({
      next: (data) => {
        if (data) {
          this.searchResult = data;
        } else {
          this.searchError = 'No report found with that ID.';
        }
      },
      error: () => {
        this.searchError = 'Error occurred while searching for a report.';
      }
    });
  }

  deleteReport(reportId: number) {
    if (!confirm('Are you sure you want to delete this report?')) return;
    this.reportService.deleteReport(reportId).subscribe({
      next: () => {
        // Optionally, update the search result or hide the search card
        this.searchResult = null;
        this.getAllReports();
      },
      error: () => {
        this.searchError = 'Failed to delete the report.';
      }
    });
  }
}
