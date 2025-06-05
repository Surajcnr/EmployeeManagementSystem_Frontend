import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Report {
  reportId: number;
  employeeId: number;
  reportDate: string;
  performanceSummary: string;
  feedbackSummary: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:9091/reports';

  constructor(private http: HttpClient) {}

  getAllReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/fetchAll`);
  }

  generateReportByEmployeeId(employeeId: number): Observable<Report> {
    return this.http.post<Report>(`${this.apiUrl}/save`, { employeeId });
  }

  searchReportById(reportId: number): Observable<Report> {
    return this.http.get<Report>(`${this.apiUrl}/fetchById/${reportId}`);
  }

  deleteReport(reportId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteById/${reportId}`);
  }
}
