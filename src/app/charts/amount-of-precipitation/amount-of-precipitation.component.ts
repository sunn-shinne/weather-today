import { Component, Input, OnInit } from '@angular/core';
import { registerables } from 'node_modules/chart.js'
import Chart from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { WeatherService } from 'src/app/services/weather.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-amount-of-precipitation',
  templateUrl: './amount-of-precipitation.component.html',
  styleUrls: ['./amount-of-precipitation.component.scss']
})
export class AmountOfPrecipitationComponent implements OnInit {


  @Input() chartName: string | undefined;

  constructor(
    public weatherService: WeatherService,
    public translateService:TranslateService
    ) { 
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);
  }

  ngOnInit(): void {
    const datepipe: DatePipe = new DatePipe('en-US')

    let labels = this.weatherService.hourlyForecast.map((hour) => datepipe.transform(hour.time, 'HH:mm'))
    let data = this.weatherService.hourlyForecast.map((hour) => hour.precip_mm)

    const barChart = new Chart('amount-of-precipitation', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: this.chartName,
          data: data,
          backgroundColor: [
            'rgba(63, 158, 238, 0.25)',
          ],
          borderColor: [
            'rgb(152, 204,	253)',
          ],
          borderWidth: {
            top: 1,
            right: 0,
            bottom: 0,
            left: 0
          },
          barPercentage: 1.0,
          categoryPercentage: 1.0
        }]
      }
    });
  }

}
