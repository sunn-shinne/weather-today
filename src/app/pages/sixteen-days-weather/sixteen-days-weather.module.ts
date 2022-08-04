import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SixteenDaysWeatherRoutingModule } from './sixteen-days-weather-routing.module';
import { DailyStepForecastComponent } from 'src/app/weather/daily-step-forecast/daily-step-forecast.component';
import { SixteenDaysWeatherComponent } from './sixteen-days-weather/sixteen-days-weather.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DailyStepForecastComponent,
    SixteenDaysWeatherComponent,
  ],
  imports: [   
    SixteenDaysWeatherRoutingModule,
    TranslateModule,
    MatProgressSpinnerModule,
    SharedModule,
    TranslateModule
  ]
})
export class SixteenDaysWeatherModule { }
