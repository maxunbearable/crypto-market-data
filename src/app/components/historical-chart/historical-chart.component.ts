import { Component, OnInit } from '@angular/core';
import { CoinApiService } from '../../services/coin-api.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-historical-chart',
  templateUrl: './historical-chart.component.html',
  standalone: true,
  imports: [
    NgxChartsModule,
  ]
})
export class HistoricalChartComponent implements OnInit {
  historicalData: any[] = [];
  view: [number, number] = [700, 400];

  constructor(private coinApiService: CoinApiService) {}

  ngOnInit(): void {
    this.coinApiService.getHistoricalPrices().subscribe(data => {
      console.log(data);
      this.historicalData = data;
    });
  }
}
