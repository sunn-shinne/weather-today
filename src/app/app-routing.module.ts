import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SixteenDaysWeatherComponent } from './pages/sixteen-days-weather/sixteen-days-weather.component';
import { TodayWeatherComponent } from './pages/today-weather/today-weather.component';
import { TomorrowWeatherComponent } from './pages/tomorrow-weather/tomorrow-weather.component';

const routes: Routes = [
  { path: '', redirectTo: '/today', pathMatch: 'full' },
  { path: 'today', component: TodayWeatherComponent },
  { path: 'tomorrow', component: TomorrowWeatherComponent },
  { path: '16-days', component: SixteenDaysWeatherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
