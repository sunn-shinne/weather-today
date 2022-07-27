import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DailyStepForecast, DayForecast } from '../interfaces/DailyStepForecast';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-daily-step-forecast',
  templateUrl: './daily-step-forecast.component.html',
  styleUrls: ['./daily-step-forecast.component.scss']
})
export class DailyStepForecastComponent implements OnInit {
  private _data = new BehaviorSubject<any>([]);

 // DailyStepForecastData: any
  columnsToDisplay: string[] = [];
  columnsNames : string[] = [];

  @Input() DailyStepForecast!: DayForecast[];
  //@Input() columnsToDisplay!: any

  constructor(public weatherService: WeatherService,) { }

  ngOnInit(): void {
    this.columnsToDisplay = ['valid_date','temp','weather','wind_spd','pres','rh'];
    //this.columnsNames = ['Температура','Погода','Скорость ветра','Давление','Относительная влажность']
    //this.DailyStepForecastData = this.DailyStepForecast.data;
    //console.log(this.DailyStepForecastData)
    //this.columnsToDisplay = keyof DayForecast;
    //console.log(Object.keys(this.DailyStepForecast))
  }

}
