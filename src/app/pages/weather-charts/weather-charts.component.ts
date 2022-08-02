import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription, switchMap, forkJoin, map } from 'rxjs';
import { HourlyForecast } from 'src/app/interfaces/HourlyForecast';
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
        forkJoin({
          hourlyForecast: this.weatherService.getHourlyForecast(
            place.cords.lat,
            place.cords.lon,
            1
          ).pipe(
            map((data) => {
              return data.forecast.forecastday[0].hour}
            )
          ),
          airPolution: this.weatherService.getForecastAirPollution(
            place.cords.lat,
            place.cords.lon
          ),
        })
        )
      )
      .subscribe({
        next: (chartsData) => {
          this.weatherService.chartsData = chartsData;
          this.requestState = 'fulfilled';
        },
        error: () => (this.requestState = 'failed'),
      });
  }

  ngOnDestroy(): void {
    this.hourlyForecastSub.unsubscribe();
  }
}
