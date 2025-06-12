import { Component, OnInit } from '@angular/core';
import { FeedbackService, Feedback } from '../feedback.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  filteredFeedbacks: Feedback[] = [];
  loading = true;

  showFeedbackCard = false;
  showSearchCard = false;
  editMode = false;
  searchFeedbackId: number | null = null;
  searchedFeedback: Feedback | null = null;
  searchError: string = '';
  originalFeedback: Feedback | null = null;
  searchEmployeeId: number | null = null;

  // Form model
  newFeedback = {
    fromEmployeeId: null,
    toEmployeeId: null,
    feedbackType: '',
    comments: ''
  };

  feedbackTypes = [
    'Behavioral',
    'Performance',
    'Appreciation & Recognition'
  ];

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {
    this.getFeedbacks();
  }

  getFeedbacks() {
    this.loading = true;
    this.feedbackService.getAllFeedbacks().subscribe({
      next: (data) => {
        this.feedbacks = data;
        this.filteredFeedbacks = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  toggleFeedbackCard() {
    this.showFeedbackCard = !this.showFeedbackCard;
  }

  submitFeedback() {
    // Adjust the API endpoint and method as per your backend
    this.feedbackService.addFeedback(this.newFeedback).subscribe({
      next: () => {
        this.getFeedbacks();
        this.resetForm();
        this.showFeedbackCard = false;
        alert('Feedback submitted!');
      },
      error: () => {
        alert('Failed to submit feedback!');
      }
    });
  }

  resetForm() {
    this.newFeedback = {
      fromEmployeeId: null,
      toEmployeeId: null,
      feedbackType: '',
      comments: ''
    };
  }
  toggleSearchCard() {
    this.showSearchCard = !this.showSearchCard;
    if (this.showSearchCard) this.showFeedbackCard = false;
    this.searchedFeedback = null;
    this.searchError = '';
    this.editMode = false;
  }

  searchFeedback() {
    this.searchedFeedback = null;
    this.searchError = '';
    this.editMode = false;
    if (!this.searchFeedbackId) return;
    this.feedbackService.getFeedbackById(this.searchFeedbackId).subscribe({
      next: (fb) => {
        this.searchedFeedback = { ...fb };
        this.originalFeedback = { ...fb };
      },
      error: () => {
        this.searchError = 'Feedback not found.';
      }
    });
  }
  enableEdit() {
    this.editMode = true;
  }

  updateFeedback() {
    if (this.searchedFeedback) {
      this.feedbackService.updateFeedback(this.searchedFeedback).subscribe({
        next: () => {
          this.editMode = false;
          this.getFeedbacks();
        },
        error: () => {
          alert('Update failed!');
        }
      });
    }
  }
  cancelEdit() {
    if (this.originalFeedback) {
      this.searchedFeedback = { ...this.originalFeedback };
    }
    this.editMode = false;
  }

  deleteFeedback(feedbackId: number) {
    if (confirm('Are you sure you want to delete this feedback?')) {
      this.feedbackService.deleteFeedback(feedbackId).subscribe({
        next: () => {
          this.searchedFeedback = null;
          this.getFeedbacks();
        },
        error: () => {
          alert('Delete failed!');
        }
      });
    }
  }
  searchEmployeeFeedback() {
    if (this.searchEmployeeId) {
      this.filteredFeedbacks = this.feedbacks.filter(
        (feedback) =>
          feedback.fromEmployeeId === this.searchEmployeeId ||
          feedback.toEmployeeId === this.searchEmployeeId
      );
    } else {
      this.filteredFeedbacks = this.feedbacks; // Reset to show all feedbacks if no ID is entered
    }
  }
}
