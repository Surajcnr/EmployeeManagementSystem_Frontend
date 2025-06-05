import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Feedback {
  feedbackId: number;
  fromEmployeeId: number;
  toEmployeeId: number;
  feedbackType: string;
  comments: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:9091/feedbacks/fetchAll'; 
  private postUrl = 'http://localhost:9091/feedbacks/save'; 

  constructor(private http: HttpClient) {}

  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl);
  }

  addFeedback(feedback: any): Observable<any> {
    return this.http.post(this.postUrl, feedback);
  }
  getFeedbackById(feedbackId: number): Observable<Feedback> {
    return this.http.get<Feedback>(`http://localhost:9091/feedbacks/fetchById/${feedbackId}`);
  }
  
  updateFeedback(feedback: Feedback): Observable<any> {
    return this.http.put(`http://localhost:9091/feedbacks/update/${feedback.feedbackId}`, feedback);
  }
  
  deleteFeedback(feedbackId: number): Observable<any> {
    return this.http.delete(`http://localhost:9091/feedbacks/deleteById/${feedbackId}`);
  }
}
