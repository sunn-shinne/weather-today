import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodayWeatherComponent } from './pages/today-weather/today-weather/today-weather.component';
import { WeatherСhartsComponent } from './pages/weather-charts/weather-charts/weather-charts.component';

const routes: Routes = [
  { path: '', redirectTo: '/today', pathMatch: 'full' },
  { path: 'today',  component: TodayWeatherComponent },
  { path: 'charts',  loadChildren: () => import('./pages/weather-charts/weather-charts.module').then((m) => m.WeatherChartsModule) },
  { path: '16-days', loadChildren: () => import('./pages/sixteen-days-weather/sixteen-days-weather.module').then((m) => m.SixteenDaysWeatherModule) },
  { path: '**', redirectTo: '/today' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
