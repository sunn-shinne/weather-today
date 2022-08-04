import { NgModule } from '@angular/core';

import { TodayWeatherRoutingModule } from './today-weather-routing.module';
import { TodayWeatherComponent } from './today-weather/today-weather.component';
import { HourlyForecastComponent } from 'src/app/weather/hourly-forecast/hourly-forecast.component';
import { SunriseWeatherComponent } from 'src/app/weather/sunrise-weather/sunrise-weather.component';
import { WeatherMapComponent } from 'src/app/weather/weather-map/weather-map.component';
import { RightNowWeatherComponent } from 'src/app/weather/right-now-weather/right-now-weather.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TodayWeatherComponent,
    HourlyForecastComponent,
    SunriseWeatherComponent,
    WeatherMapComponent,
    RightNowWeatherComponent,
  ],
  imports: [
    TodayWeatherRoutingModule,
    TranslateModule,
    MatProgressSpinnerModule,
    SharedModule,
    TranslateModule
  ]
})
export class TodayWeatherModule { }
