import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PerformanceReview {
  reviewId: number;
  employeeId: number;
  managerId: number;
  date: string;
  performanceScore: number;
  feedback: string;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private apiUrl = 'http://localhost:9091/performancereviews/fetchAll'; // Update with your backend endpoint

  constructor(private http: HttpClient) {}

  getAllReviews(): Observable<PerformanceReview[]> {
    return this.http.get<PerformanceReview[]>(this.apiUrl);
  }
}
