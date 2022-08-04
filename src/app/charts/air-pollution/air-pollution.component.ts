import { Component, OnInit, DoCheck } from '@angular/core';
import { registerables } from 'node_modules/chart.js';
import Chart from 'chart.js/auto';
import { WeatherService } from 'src/app/services/weather.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
import { AirList } from 'src/app/interfaces/AirPollution';

@Component({
  selector: 'app-air-pollution',
  templateUrl: './air-pollution.component.html',
  styleUrls: ['./air-pollution.component.scss'],
})
export class AirPollutionComponent implements OnInit, DoCheck {
  currentAirForecast = this.weatherService.chartsData.airPolution;
  airChart!: Chart;

  constructor(
    public weatherService: WeatherService,
    public translateService: TranslateService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.airChart = new Chart('air-pollution', {
      type: 'line',
      data: {
        labels: this.getLabels(this.currentAirForecast),
        datasets: [
          {
            label: this.translateService.instant('INFO.AIR_QUALITY_INDEX'),
            data: this.getData(this.currentAirForecast),
            backgroundColor: ['rgba(186, 100, 209, 0.5)'],
            borderColor: ['rgb(186, 100, 209, 0.6)'],
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
    const newAirForecast = this.weatherService.chartsData.airPolution;
    if (!_.isEqual(this.currentAirForecast, newAirForecast)) {
      this.airChart.data.datasets[0].data = this.getData(newAirForecast);
      this.airChart.data.labels = this.getLabels(newAirForecast);
      this.currentAirForecast = this.weatherService.chartsData.airPolution;
    }
    this.airChart.data!.datasets[0].label = this.translateService.instant(
      'INFO.AIR_QUALITY_INDEX'
    );
    this.airChart.update();
  }

  getLabels(forecast: AirList[]): (string | null)[] {
    const datepipe: DatePipe = new DatePipe('en-US');
    let shortenedForecast: (string | null)[] = [];
    for (let i = 0; i < 24; i += 2) {
      shortenedForecast.push(
        datepipe.transform(new Date(forecast[i].dt * 1000), 'HH:mm')
      );
    }
    return shortenedForecast;
  }

  getData(forecast: AirList[]): number[] {
    let shortenedForecast: number[] = [];
    for (let i = 0; i < 24; i += 2) {
      shortenedForecast.push(forecast[i].main.aqi);
    }
    return shortenedForecast;
  }
}
