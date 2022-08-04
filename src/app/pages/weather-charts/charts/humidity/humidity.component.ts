import { DatePipe } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Chart, registerables } from 'chart.js';
import * as _ from 'lodash';
import { Hour } from 'src/app/interfaces/HourlyForecast';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.scss'],
})
export class HumidityComponent implements OnInit, DoCheck {
  currentForecast = this.weatherService.chartsData.hourlyForecast;
  lineChart!: Chart;

  constructor(
    public weatherService: WeatherService,
    public translateService: TranslateService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.lineChart = new Chart('humidity', {
      type: 'line',
      data: {
        labels: this.getLabels(this.currentForecast),
        datasets: [
          {
            label: this.translateService.instant('INFO.HUMIDITY') + ' %',
            data: this.getData(this.currentForecast),
            backgroundColor: ['rgba(49, 214, 154, .6)'],
            borderColor: ['rgba(50, 143, 120, .3)'],
            tension: 0.2,
          },
        ],
      },
      options: {
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
    const newForecast = this.weatherService.chartsData.hourlyForecast;
    if (!_.isEqual(this.currentForecast, newForecast)) {
      this.lineChart.data.datasets[0].data = this.getData(newForecast);
      this.currentForecast = this.weatherService.chartsData.hourlyForecast;
      this.lineChart.data.labels = this.getLabels(newForecast);
    }
    this.lineChart.data!.datasets[0].label =
      this.translateService.instant('INFO.HUMIDITY') + ' %';
    this.lineChart.update();
  }

  getLabels(forecast: Hour[]): (string | null)[] {
    const datepipe: DatePipe = new DatePipe('en-US');
    return forecast.map((hour) => datepipe.transform(hour.time, 'HH:mm'));
  }

  getData(forecast: Hour[]): number[] {
    return forecast.map((hour) => hour.humidity);
  }
}
