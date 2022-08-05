import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherChartsRoutingModule } from './weather-charts-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AirPollutionComponent } from './charts/air-pollution/air-pollution.component';
import { AmountOfPrecipitationComponent } from './charts/amount-of-precipitation/amount-of-precipitation.component';
import { AverageTemperatureComponent } from './charts/average-temperature/average-temperature.component';
import { HumidityComponent } from './charts/humidity/humidity.component';
import { WeatherСhartsComponent } from './weather-charts/weather-charts.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    WeatherСhartsComponent,
    AirPollutionComponent,
    AmountOfPrecipitationComponent,
    AverageTemperatureComponent,
    HumidityComponent,
  ],
  imports: [ 
    WeatherChartsRoutingModule,
    MatProgressSpinnerModule,
    TranslateModule,
    SharedModule
  ]
})
export class WeatherChartsModule { }
