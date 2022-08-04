import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherMapComponent } from 'src/app/weather/weather-map/weather-map.component';
import { WeatherСhartsComponent } from './weather-charts/weather-charts.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherСhartsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherChartsRoutingModule { }
