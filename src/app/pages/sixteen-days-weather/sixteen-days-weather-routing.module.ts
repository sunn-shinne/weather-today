import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SixteenDaysWeatherComponent } from './sixteen-days-weather/sixteen-days-weather.component';

const routes: Routes = [
  {
    path: '',
    component: SixteenDaysWeatherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SixteenDaysWeatherRoutingModule { }
