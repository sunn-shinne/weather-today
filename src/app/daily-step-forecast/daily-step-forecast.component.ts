import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-daily-step-forecast',
  templateUrl: './daily-step-forecast.component.html',
  styleUrls: ['./daily-step-forecast.component.scss']
})
export class DailyStepForecastComponent implements OnInit {

  columnsToDisplay: string[] = [];

  constructor(
    public weatherService: WeatherService,
    public translate: TranslateService,
    ) { }

  ngOnInit(): void {
    this.columnsToDisplay = ['valid_date','weather','wind_spd','pres','rh'];
  }

  addSignToTemp(temp: number): string {
    return `${Math.sign(temp) >= 0 ? '+' : '-'}${Math.round(temp)}`;
  }

}
