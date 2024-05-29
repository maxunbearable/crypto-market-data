import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HistoricalChartComponent} from "./components/historical-chart/historical-chart.component";
import {RealTimePriceComponent} from "./components/real-time-price/real-time-price.component";
import {HttpClient} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HistoricalChartComponent,
    RealTimePriceComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'crypto-market-data';
}
