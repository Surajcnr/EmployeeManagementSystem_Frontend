import { Component, OnInit } from '@angular/core';
import { PerformanceService, PerformanceReview } from '../performance.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './performance.component.html',
  styleUrl: './performance.component.css'
})
export class PerformanceComponent implements OnInit {
  reviews: PerformanceReview[] = [];
  filteredReviews: PerformanceReview[] = [];
  loading = true;

  showReviewCard = false;
  showSearchCard = false;
  editMode = false;

  // For new review
  newReview = {
    employeeId: null,
    managerId: null,
    date: '',
    performanceScore: null,
    feedback: ''
  };

  // For search
  searchReviewId: number | null = null;
  searchedReview: PerformanceReview | null = null;
  originalReview: PerformanceReview | null = null;
  searchError: string = '';

  searchEmployeeId: number | null = null;

  constructor(private performanceService: PerformanceService) {}

  ngOnInit() {
    this.getReviews();
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

  getReviews() {
    this.loading = true;
    this.performanceService.getAllReviews().subscribe({
      next: (data) => {
        this.reviews = data;
        this.filteredReviews = data; // Initialize filteredReviews with all reviews
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  toggleReviewCard() {
    this.showReviewCard = !this.showReviewCard;
    if (this.showReviewCard) this.showSearchCard = false;
  }

  toggleSearchCard() {
    this.showSearchCard = !this.showSearchCard;
    if (this.showSearchCard) this.showReviewCard = false;
    this.searchedReview = null;
    this.searchError = '';
    this.editMode = false;
  }

  submitReview() {
    if (this.newReview.date) {
      const d = new Date(this.newReview.date);
      this.newReview.date = d.toISOString().slice(0, 10);
    }
    this.performanceService.addReview(this.newReview).subscribe({
      next: () => {
        this.getReviews();
        this.resetForm();
        this.showReviewCard = false;
        alert('Performance review submitted!');
      },
      error: () => {
        alert('Failed to submit performance review!');
      }
    });
  }

  resetForm() {
    this.newReview = {
      employeeId: null,
      managerId: null,
      date: '',
      performanceScore: null,
      feedback: ''
    };
  }

  searchReview() {
    this.searchedReview = null;
    this.searchError = '';
    this.editMode = false;
    if (!this.searchReviewId) return;
    this.performanceService.getReviewById(this.searchReviewId).subscribe({
      next: (review) => {
        this.searchedReview = { ...review };
        this.originalReview = { ...review };
      },
      error: () => {
        this.searchError = 'Performance review not found.';
      }
    });
  }

  enableEdit() {
    this.editMode = true;
  }

  updateReview() {
    if (this.searchedReview) {
      this.performanceService.updateReview(this.searchedReview).subscribe({
        next: () => {
          this.editMode = false;
          this.getReviews();
        },
        error: () => {
          alert('Update failed!');
        }
      });
    }
  }

  cancelEdit() {
    if (this.originalReview) {
      this.searchedReview = { ...this.originalReview };
    }
    this.editMode = false;
  }

  deleteReview(reviewId: number) {
    if (confirm('Are you sure you want to delete this performance review?')) {
      this.performanceService.deleteReview(reviewId).subscribe({
        next: () => {
          this.searchedReview = null;
          this.getReviews();
        },
        error: () => {
          alert('Delete failed!');
        }
      });
    }
  }

  searchEmployeePerformance() {
    if (this.searchEmployeeId) {
      this.filteredReviews = this.reviews.filter(
        (review) => review.employeeId === this.searchEmployeeId
      );
    } else {
      this.filteredReviews = this.reviews; // Reset to show all reviews if no ID is entered
    }
  }
}