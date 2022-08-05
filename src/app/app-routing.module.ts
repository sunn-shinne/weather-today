import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'today', pathMatch: 'full' },
  {
    path: 'today',
    loadChildren: () =>
      import('./pages/today-weather/today-weather.module').then(
        (m) => m.TodayWeatherModule
      ),
  },
  {
    path: '16-days',
    loadChildren: () =>
      import('./pages/sixteen-days-weather/sixteen-days-weather.module').then(
        (m) => m.SixteenDaysWeatherModule
      ),
  },
  {
    path: 'charts',
    loadChildren: () =>
      import('./pages/weather-charts/weather-charts.module').then(
        (m) => m.WeatherChartsModule
      ),
  },
  { path: '**', redirectTo: 'today' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
