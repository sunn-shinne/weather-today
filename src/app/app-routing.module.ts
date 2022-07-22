import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SevenDaysWeatherComponent } from './seven-days-weather/seven-days-weather.component';
import { SixteenDaysWeatherComponent } from './sixteen-days-weather/sixteen-days-weather.component';
import { TodayWeatherComponent } from './today-weather/today-weather.component';
import { TomorrowWeatherComponent } from './tomorrow-weather/tomorrow-weather.component';

const routes: Routes = [
  { path: '', redirectTo: '/today', pathMatch: 'full' },
  { path: 'today', component: TodayWeatherComponent },
  { path: 'tomorrow', component: TomorrowWeatherComponent },
  { path: 'for-7-days', component: SevenDaysWeatherComponent },
  { path: 'for-16-days', component: SixteenDaysWeatherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
