import { Component, OnInit } from '@angular/core';
import { FeedbackService, Feedback } from '../feedback.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  loading = true;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {
    this.feedbackService.getAllFeedbacks().subscribe({
      next: (data) => {
        this.feedbacks = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
