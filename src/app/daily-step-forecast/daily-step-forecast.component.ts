import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DailyStepForecast, DayForecast } from '../interfaces/DailyStepForecast';

@Component({
  selector: 'app-daily-step-forecast',
  templateUrl: './daily-step-forecast.component.html',
  styleUrls: ['./daily-step-forecast.component.scss']
})
export class DailyStepForecastComponent implements OnInit {
  private _data = new BehaviorSubject<any>([]);

 // DailyStepForecastData: any
  //columnsToDisplay: any

  @Input() DailyStepForecast!: DayForecast[];
  @Input() columnsToDisplay!: any

  constructor() { }

  ngOnInit(): void {
    //this.DailyStepForecastData = this.DailyStepForecast.data;
    //console.log(this.DailyStepForecastData)
    //this.columnsToDisplay = keyof DayForecast;
    //console.log(Object.keys(this.DailyStepForecast))
  }

}
