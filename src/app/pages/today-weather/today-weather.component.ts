import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, map, Subscription, switchMap } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-today-weather',
  templateUrl: './today-weather.component.html',
  styleUrls: ['./today-weather.component.scss'],
})
export class TodayWeatherComponent implements OnInit, OnDestroy {
  weatherSub!: Subscription;
  requestState!: 'loading' | 'failed' | 'fulfilled';

  constructor(
    public weatherService: WeatherService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    if (!this.weatherService.rightNowWeather || !this.weatherService.weatherForecast) {
      this.requestState = 'loading';
    } else {
      this.requestState = 'fulfilled';
    }

    this.weatherSub = this.locationService.locationChange$
      .pipe(
        switchMap((place) =>
          forkJoin({
            rightNow: this.weatherService
              .getCurrentWeatherByCoordinates(place.cords.lat, place.cords.lon)
              .pipe(map((data) =>this.weatherService.normolizeRightNowWeatherData(data))),
            forecast: this.weatherService
              .getForecastByCoordinates(place.cords.lat, place.cords.lon),
          })
        )
      )
      .subscribe({
        next: ({ rightNow, forecast }) => {
          this.weatherService.rightNowWeather = rightNow;
          this.weatherService.weatherForecast = forecast;
          this.requestState = 'fulfilled';
        },
        error: () => (this.requestState = 'failed'),
      });
  }

  ngOnDestroy(): void {
    this.weatherSub.unsubscribe();
  }
}
