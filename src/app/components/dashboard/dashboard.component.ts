import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {
  ExchangeRateResponse,
  TimeSeriesResponse,
} from '../../models/exchange-rate.model';
import { ExchangeRateService } from '../../services/services/exchange-rate.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isEditMode = false;
  showLineChart = true;
  showBarChart = true;
  lineChart?: Chart;
  barChart?: Chart;

  constructor(
    private exchangeRateService: ExchangeRateService,
    private toastr: ToastrService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.fetchLineChartData();
    this.fetchBarChartData();
  }

  /**
   * Toggles between edit mode and view mode.
   */
  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    this.toastr.info(
      this.isEditMode ? 'Edit mode enabled' : 'View mode enabled',
      'Feedback'
    );
  }

  /**
   * Toggles the visibility of a chart (line chart or bar chart).
   * Ensures that at least one chart remains visible.
   *
   * @param {string} chartType - The type of chart to toggle ('lineChart' or 'barChart').
   */
  toggleChart(chartType: string): void {
    if (chartType === 'lineChart') {
      if (!this.showBarChart && this.showLineChart) {
        this.toastr.warning('At least one chart must be visible', 'Feedback');
        return;
      }
      if (this.showLineChart && this.lineChart) {
        this.lineChart.destroy();
        this.lineChart = undefined;
      }
      this.showLineChart = !this.showLineChart;
      this.toastr.info(
        this.showLineChart ? 'Line Chart added' : 'Line Chart hidden',
        'Feedback'
      );
      if (this.showLineChart) {
        setTimeout(() => this.fetchLineChartData(), 0);
      }
    } else if (chartType === 'barChart') {
      if (!this.showLineChart && this.showBarChart) {
        this.toastr.warning('At least one chart must be visible', 'Feedback');
        return;
      }
      if (this.showBarChart && this.barChart) {
        this.barChart.destroy();
        this.barChart = undefined;
      }
      this.showBarChart = !this.showBarChart;
      this.toastr.info(
        this.showBarChart ? 'Bar Chart added' : 'Bar Chart hidden',
        'Feedback'
      );
      if (this.showBarChart) {
        setTimeout(() => this.fetchBarChartData(), 0);
      }
    }
  }

  /**
   * Initializes a Chart.js chart with the specified configuration.
   *
   * @param {'line' | 'bar'} chartType - The type of chart to initialize ('line' or 'bar').
   * @param {string} chartId - The ID of the HTML canvas element where the chart will be rendered.
   * @param {string[]} labels - The labels for the chart's x-axis.
   * @param {number[]} data - The data points for the chart.
   * @param {string[]} [backgroundColors] - Optional background colors for bar chart bars.
   * @returns {Chart} - The initialized Chart.js instance.
   */
  initializeChart(
    chartType: 'line' | 'bar',
    chartId: string,
    labels: string[],
    data: number[],
    backgroundColors?: string[]
  ): Chart {
    return new Chart(chartId, {
      type: chartType,
      data: {
        labels,
        datasets: [
          {
            label:
              chartType === 'line'
                ? 'USD/EUR Exchange Rate'
                : 'Latest Exchange Rates',
            data,
            borderColor: chartType === 'line' ? 'blue' : undefined,
            backgroundColor: backgroundColors,
            fill: chartType === 'line' ? false : undefined,
          },
        ],
      },
    });
  }

  /**
   * Fetches data for the line chart (USD/EUR exchange rates over the last 30 days).
   */
  fetchLineChartData(): void {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    const endDate = new Date();

    this.exchangeRateService
      .getTimeSeries(
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      )
      .subscribe((data: TimeSeriesResponse) => {
        if (!data.rates) return;

        const labels = Object.keys(data.rates);
        const rates = labels.map((date) => data.rates[date]['EUR']);

        this.lineChart = this.initializeChart(
          'line',
          'lineChart',
          labels,
          rates
        );
      });
  }

  /**
   * Fetches data for the bar chart (latest exchange rates for USD/EGP, USD/GBP, and USD/EUR).
   */
  fetchBarChartData(): void {
    this.exchangeRateService
      .getLatestRates()
      .subscribe((data: ExchangeRateResponse) => {
        if (!data.rates) return;

        const labels = Object.keys(data.rates);
        const rates = Object.values(data.rates);

        this.barChart = this.initializeChart('bar', 'barChart', labels, rates, [
          'red',
          'green',
          'blue',
        ]);
      });
  }
}
