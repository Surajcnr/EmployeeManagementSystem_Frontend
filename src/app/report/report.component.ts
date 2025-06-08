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

  get isEmployee(): boolean {
    const roles = sessionStorage.getItem('roles');
    if (!roles) return false;
    try {
      const rolesArray = JSON.parse(roles);
      return Array.isArray(rolesArray) ? rolesArray.includes('employee') : rolesArray === 'employee';
    } catch {
      return false;
    }
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
    this.generateEmployeeId = null;
    this.generateError = '';
  }

  generateReport() {
    this.generateError = '';
    if (!this.generateEmployeeId) return;
    this.reportService.generateReportByEmployeeId(this.generateEmployeeId).subscribe({
      next: () => {
        this.getAllReports();
        this.showGenerateCard = false;
        this.generateEmployeeId = null;
      },
      error: () => {
        this.generateError = 'Report generation failed or employee not found.';
      }
    });
  }

  toggleSearchCard() {
    this.showSearchCard = !this.showSearchCard;
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
        this.searchResult = null;
        this.getAllReports();
      },
      error: () => {
        this.searchError = 'Failed to delete the report.';
      }
    });
  }
}
