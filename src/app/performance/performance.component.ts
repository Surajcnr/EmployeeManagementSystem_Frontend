import { Component, OnInit } from '@angular/core';
import { PerformanceService, PerformanceReview } from '../performance.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './performance.component.html',
  styleUrl: './performance.component.css'
})
export class PerformanceComponent implements OnInit {
  reviews: PerformanceReview[] = [];
  loading = true;

  constructor(private performanceService: PerformanceService) {}

  ngOnInit() {
    this.performanceService.getAllReviews().subscribe({
      next: (data) => {
        this.reviews = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
