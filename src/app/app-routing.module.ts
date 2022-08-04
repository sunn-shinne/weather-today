import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SixteenDaysWeatherComponent } from './pages/sixteen-days-weather/sixteen-days-weather/sixteen-days-weather.component';
import { TodayWeatherComponent } from './pages/today-weather/today-weather/today-weather.component';
import { WeatherСhartsComponent } from './pages/weather-charts/weather-charts/weather-charts.component';

const routes: Routes = [
  { path: '', redirectTo: '/today', pathMatch: 'full' },
  { path: 'today', component: TodayWeatherComponent },
  { path: 'charts', component: WeatherСhartsComponent },
  { path: '16-days', component: SixteenDaysWeatherComponent },
  { path: '**', redirectTo: '/today' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
