import { DatePipe } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Chart, registerables } from 'chart.js';
import * as _ from 'lodash';
import { Hour } from 'src/app/interfaces/HourlyForecast';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-average-temperature',
  templateUrl: './average-temperature.component.html',
  styleUrls: ['./average-temperature.component.scss'],
})
export class AverageTemperatureComponent implements OnInit, DoCheck {
  currentForecast = this.weatherService.chartsData.hourlyForecast;
  lineChart!: Chart;

  constructor(
    public weatherService: WeatherService,
    public translateService: TranslateService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.lineChart = new Chart('average-temperature', {
      type: 'line',
      data: {
        labels: this.getLabels(this.currentForecast),
        datasets: [
          {
            label:
              this.translateService.instant('INFO.AVERAGE_TEMPERATURE') + ' °C',
            data: this.getData(this.currentForecast),
            backgroundColor: ['rgba(255, 233, 229)'],
            borderColor: ['rgba(246, 96, 73, .9)'],
            borderWidth: 2,
            tension: 0.5,
            fill: true,
          },
        ],
      },
      options: {
        hover: {
          intersect: false,
        },
        elements: {
          point: {
            radius: 0,
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
    const newForecast = this.weatherService.chartsData.hourlyForecast;
    if (!_.isEqual(this.currentForecast, newForecast)) {
      this.lineChart.data.datasets[0].data = this.getData(newForecast);
      this.lineChart.data.labels = this.getLabels(newForecast);
      this.currentForecast = this.weatherService.chartsData.hourlyForecast;
    }
    this.lineChart.data!.datasets[0].label =
      this.translateService.instant('INFO.AVERAGE_TEMPERATURE') + ' °C';
    this.lineChart.update();
  }

  getLabels(forecast: Hour[]): (string | null)[] {
    const datepipe: DatePipe = new DatePipe('en-US');
    return forecast.map((hour) => datepipe.transform(hour.time, 'HH:mm'));
  }

  getData(forecast: Hour[]): number[] {
    return forecast.map((hour) => hour.temp_c);
  }
}
