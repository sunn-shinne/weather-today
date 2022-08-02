import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-charts',
  templateUrl: './weather-charts.component.html',
  styleUrls: ['./weather-charts.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherСhartsComponent implements OnInit, OnDestroy {
  requestState: 'loading' | 'failed' | 'fulfilled' = 'loading';

  hourlyForecastSub!: Subscription;

  constructor(
    public weatherService: WeatherService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.hourlyForecastSub = this.locationService.locationChange$
      .pipe(
        switchMap((place) =>
          this.weatherService.getHourlyForecast(
            place.cords.lat,
            place.cords.lon,
            1
          )
        )
      )
      .subscribe({
        next: (value) => {
          this.weatherService.chartsData.hourlyForecast =
            value.forecast.forecastday[0].hour;
          this.requestState = 'fulfilled';
        },
        error: () => (this.requestState = 'failed'),
      });
  }

  ngOnDestroy(): void {
    this.hourlyForecastSub.unsubscribe();
  }
}
