import { Component, OnDestroy, OnInit } from '@angular/core';
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
  requestState: 'loading' | 'failed' | 'fulfilled' = 'loading';

  constructor(
    public weatherService: WeatherService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.weatherSub = this.locationService.locationChange$
      .pipe(
        switchMap((place) =>
          forkJoin({
            rightNowWeather: this.weatherService
              .getCurrentWeatherByCoordinates(place.cords.lat, place.cords.lon)
              .pipe(
                map((data) =>
                  this.weatherService.normolizeRightNowWeatherData(data)
                )
              ),
            hourlyForcast: this.weatherService.getForecastByCoordinates(
              place.cords.lat,
              place.cords.lon
            ),
          })
        )
      )
      .subscribe({
        next: (todayWeather) => {
          console.log(todayWeather.hourlyForcast);
          this.weatherService.todayWeather = todayWeather;
          this.requestState = 'fulfilled';
        },
        error: () => (this.requestState = 'failed'),
      });
  }

  ngOnDestroy(): void {
    this.weatherSub.unsubscribe();
  }
}
