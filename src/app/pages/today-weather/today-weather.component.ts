import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, map, Subscription, switchMap } from 'rxjs';
import { Forecast } from 'src/app/interfaces/Forecast';
import { PlaceSuggestion } from 'src/app/interfaces/PlaceSuggestion';
import { RightNowWeather } from 'src/app/interfaces/RightNowWeather';
import { LocationService } from 'src/app/services/location.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-today-weather',
  templateUrl: './today-weather.component.html',
  styleUrls: ['./today-weather.component.scss'],
})
export class TodayWeatherComponent implements OnInit, OnDestroy {
  requestState!: 'loading' | 'failed' | 'fulfilled';

  currentPlace$!: EventEmitter<PlaceSuggestion>;
  weatherSub!: Subscription;

  weatherForecast: Forecast = {} as Forecast;
  rightNowWeather: RightNowWeather = {} as RightNowWeather;

  constructor(
    public weatherService: WeatherService,
    private locationService: LocationService
  ) {
    this.currentPlace$ = this.locationService.locationChange$;
  }

  ngOnInit(): void {
    this.requestState = 'loading';

    this.weatherSub = this.locationService.locationChange$
      .pipe(
        switchMap((place) =>
          forkJoin({
            rightNow: this.weatherService
              .getCurrentWeatherByCoordinates(place.cords.lat, place.cords.lon)
              .pipe(
                map((data) =>
                  this.weatherService.normolizeRightNowWeatherData(data)
                )
              ),
            forecast: this.weatherService.getForecastByCoordinates(
              place.cords.lat,
              place.cords.lon
            ),
          })
        )
      )
      .subscribe({
        next: ({ rightNow, forecast }) => {
          this.rightNowWeather = rightNow;
          this.weatherForecast = forecast;
          this.requestState = 'fulfilled';
        },
        error: () => (this.requestState = 'failed'),
      });
  }

  ngOnDestroy(): void {
    this.weatherSub.unsubscribe();
  }
}
