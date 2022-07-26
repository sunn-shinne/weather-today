import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription, switchMap } from 'rxjs';
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
  isLoading: boolean = false;
  currentPlace$!: EventEmitter<PlaceSuggestion>;

  rightNowWeatherSub!: Subscription;
  weatherForecastSub!: Subscription;

  weatherForecast: Forecast = {} as Forecast;
  rightNowWeather: RightNowWeather = {} as RightNowWeather;

  constructor(
    public weatherService: WeatherService,
    private locationService: LocationService
  ) {
    this.currentPlace$ = this.locationService.locationChange$;
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.rightNowWeatherSub = this.locationService.locationChange$
      .pipe(
        switchMap((place) =>
          this.weatherService.getCurrentWeatherByCoordinates(
            place.cords.lat,
            place.cords.lon
          )
        ),
        map((data) => this.weatherService.normolizeRightNowWeatherData(data))
      )
      .subscribe((data) => (this.rightNowWeather = data));

    this.weatherForecastSub = this.locationService.locationChange$
      .pipe(
        switchMap((place) =>
          this.weatherService.getForecastByCoordinates(
            place.cords.lat,
            place.cords.lon
          )
        )
      )
      .subscribe((data) => (this.weatherForecast = data));
  }

  ngOnDestroy(): void {
    this.rightNowWeatherSub.unsubscribe();
    this.weatherForecastSub.unsubscribe();
  }
}
