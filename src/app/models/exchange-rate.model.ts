export interface ExchangeRateResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface TimeSeriesResponse {
  base: string;
  start_date: string;
  end_date: string;
  rates: Record<string, Record<string, number>>;
}
