import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WeatherService } from '../services/weather.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-daily-step-forecast',
  templateUrl: './daily-step-forecast.component.html',
  styleUrls: ['./daily-step-forecast.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DailyStepForecastComponent implements OnInit {
  expandedElement!: any;
  
  columnsToDisplay: string[] = [];

  @HostListener('window:resize', ['$event'])
  onResize() {
    if(window.innerWidth < 760) {
      this.columnsToDisplay = ['valid_date','weather'];
    } else {
      this.columnsToDisplay = ['valid_date','weather','wind_spd','pres','rh'];
    }
  }

  constructor(
    public weatherService: WeatherService,
    public translate: TranslateService,
    ) { }

  ngOnInit(): void {
    if(window.innerWidth < 760) {
      this.columnsToDisplay = ['valid_date','weather'];
    } else {
      this.columnsToDisplay = ['valid_date','weather','wind_spd','pres','rh'];
    }
  }

  addSignToTemp(temp: number): string {
    return `${Math.sign(temp) >= 0 ? '+' : '-'}${Math.round(temp)}`;
  }

}
