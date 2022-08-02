import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { registerables } from 'node_modules/chart.js';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { WeatherService } from 'src/app/services/weather.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { Hour } from 'src/app/interfaces/HourlyForecast';
import * as _ from 'lodash';

@Component({
  selector: 'app-amount-of-precipitation',
  templateUrl: './amount-of-precipitation.component.html',
  styleUrls: ['./amount-of-precipitation.component.scss'],
})
export class AmountOfPrecipitationComponent implements OnInit, DoCheck {
  currentForecast = this.weatherService.hourlyForecast;
  barChart!: Chart;

  constructor(
    public weatherService: WeatherService,
    public translateService: TranslateService
  ) {
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);
  }

  ngOnInit(): void {
    this.barChart = new Chart('amount-of-precipitation', {
      type: 'bar',
      data: {
        labels: this.getLabels(this.currentForecast),
        datasets: [
          {
            label: this.translateService.instant('INFO.PRECIPITATION_AMOUNT'),
            data: this.getData(this.currentForecast),
            backgroundColor: ['rgba(63, 158, 238, 0.25)'],
            borderColor: ['rgb(152, 204,	253)'],
            borderWidth: {
              top: 1,
              right: 0,
              bottom: 0,
              left: 0,
            },
            barPercentage: 1.0,
            categoryPercentage: 1.0,
          },
        ],
      },
      plugins: [ChartDataLabels],
      options: {
        plugins: {
          datalabels: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  ngDoCheck(): void {
    const newForecast = this.weatherService.hourlyForecast;
    if (!_.isEqual(this.currentForecast, newForecast)) {
      this.barChart.data.datasets[0].data = this.getData(newForecast);
      this.barChart.data.labels = this.getLabels(newForecast);
      this.barChart.update();
      this.currentForecast = this.weatherService.hourlyForecast;
    }
  }

  getLabels(forecast: Hour[]): (string | null)[] {
    const datepipe: DatePipe = new DatePipe('en-US');
    return forecast.map((hour) => datepipe.transform(hour.time, 'HH:mm'));
  }

  getData(forecast: Hour[]): number[] {
    return forecast.map((hour) => hour.precip_mm);
  }
}
