import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ExchangeRateResponse,
  TimeSeriesResponse,
} from '../../models/exchange-rate.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private apiKey = environment.apiKey;
  private baseUrl = 'https://api.apilayer.com/exchangerates_data';

  constructor(private http: HttpClient) {}

  /**
   * Fetches time series data for USD/EUR exchange rates over a specified date range.
   *
   * @param {string} startDate - The start date for the time series data (format: YYYY-MM-DD).
   * @param {string} endDate - The end date for the time series data (format: YYYY-MM-DD).
   * @returns {Observable<TimeSeriesResponse>} - An observable emitting the time series data.
   * @throws {Error} - If the API request fails or the response is invalid.
   */
  getTimeSeries(
    startDate: string,
    endDate: string
  ): Observable<TimeSeriesResponse> {
    const url = `${this.baseUrl}/timeseries?apikey=${this.apiKey}&start_date=${startDate}&end_date=${endDate}&symbols=EUR&base=USD`;
    return this.http.get<TimeSeriesResponse>(url);
  }

  /**
   * Fetches the latest exchange rates for USD/EGP, USD/GBP, and USD/EUR.
   *
   * @returns {Observable<ExchangeRateResponse>} - An observable emitting the latest exchange rates.
   * @throws {Error} - If the API request fails or the response is invalid.
   */

  getLatestRates(): Observable<ExchangeRateResponse> {
    const url = `${this.baseUrl}/latest?apikey=${this.apiKey}&symbols=EGP,GBP,EUR&base=USD`;
    return this.http.get<ExchangeRateResponse>(url);
  }
}
