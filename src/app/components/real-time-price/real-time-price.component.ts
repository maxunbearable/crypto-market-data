import { Component, OnInit } from '@angular/core';
import { CoinApiService } from '../../services/coin-api.service';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-real-time-price',
  templateUrl: './real-time-price.component.html',
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class RealTimePriceComponent implements OnInit {
  currentPrice: number = 0;

  constructor(private coinApiService: CoinApiService) {}

  ngOnInit(): void {
    this.coinApiService.getRealTimePrice().subscribe(data => {
      if (data.type === 'trade') {
        this.currentPrice = data.price;
      }
    });
  }
}
