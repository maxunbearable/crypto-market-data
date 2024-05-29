import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class CoinApiService {
  private apiKey = 'C4136A55-7B24-4D0E-980A-FE1A46E830C5';
  private restApiUrl = 'https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/latest';
  private webSocketUrl = 'wss://ws.coinapi.io/v1/';

  constructor(private http: HttpClient) {}

  getHistoricalPrices(): Observable<any> {
    const period_id = '1DAY'; // Specify the period_id
    return this.http.get(`${this.restApiUrl}?period_id=${period_id}&apikey=${this.apiKey}`).pipe(
      map((data: any[]) => {
        return [
          {
            name: 'BTC/USD',
            series: data.map((item: any) => ({
              name: new Date(item.time_period_start).toLocaleDateString(),
              value: item.price_close
            })).filter(point => point.name && !isNaN(point.value))
          }
        ];
      }) as any
    );
  }

  getRealTimePrice(): Observable<any> {
    const subject = webSocket({
      url: `${this.webSocketUrl}?apikey=${this.apiKey}`,
      deserializer: msg => msg.data ? JSON.parse(msg.data) : msg
    });
    subject.next({
      type: "hello",
      apikey: this.apiKey,
      heartbeat: false,
      subscribe_data_type: ["trade"],
      subscribe_filter_asset_id: ["BTC/USD"]
    });
    return subject.asObservable();
  }
}
