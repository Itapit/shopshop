import { Component, OnInit } from '@angular/core';
import { AdminStatsService } from '../services/admin-stats.service';

@Component({
  selector: 'app-orders-stats',
  standalone: false,
  templateUrl: './orders-stats.component.html',
  styleUrl: './orders-stats.component.css'
})
export class OrdersStatsComponent implements OnInit {
  constructor(private statsService: AdminStatsService) {}

  totalProfit: number | null = null;
  isLoading= true;
  error: string | null = null;

  ngOnInit() {
    this.statsService.getTotalProfit().subscribe({
      next: (res) => {
        this.totalProfit = res.totalProfit;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = "Failed to load statistics"
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
