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
  addReview(review: any) {
    return this.http.post('http://localhost:9091/performancereviews/save', review);
  }
  getReviewById(reviewId: number) {
    return this.http.get<PerformanceReview>(`http://localhost:9091/performancereviews/fetchById/${reviewId}`);
  }
  updateReview(review: PerformanceReview) {
    return this.http.put(
      `http://localhost:9091/performancereviews/update/${review.reviewId}`,
      review
    );
  }
  deleteReview(reviewId: number) {
    return this.http.delete(`http://localhost:9091/performancereviews/deleteById/${reviewId}`);
  }
}
