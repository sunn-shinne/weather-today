import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodayWeatherComponent } from './today-weather/today-weather.component';

const routes: Routes = [
  {
    path: '',
    component: TodayWeatherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodayWeatherRoutingModule { }
