import { Component, OnInit } from '@angular/core';
import { AdminStatsService } from '../services/admin-stats.service';
import confetti from 'canvas-confetti';

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

        this.fireworks();
      },
      error: (err) => {
        this.error = "Failed to load statistics"
        this.isLoading = false;
        console.error(err);
      }
    });
  }
  fireworks() {
    const duration = 2000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      confetti({
        particleCount:1000,
        angle:50,
        spread:100,
        origin: { x:0 }
      });
      confetti({
        particleCount:1000,
        angle:130,
        spread:100,
        origin:{ x:1 }
      });
      if ( Date.now() > end) {
        clearInterval(interval);
      }
    }, 250);
  }
}
