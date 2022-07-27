import { Component, EventEmitter, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { DayForecast } from 'src/app/interfaces/DailyStepForecast';
import { PlaceSuggestion } from 'src/app/interfaces/PlaceSuggestion';
import { LocationService } from 'src/app/services/location.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-five-days-weather',
  templateUrl: './five-days-weather.component.html',
  styleUrls: ['./five-days-weather.component.scss'],
})
export class FiveDaysWeatherComponent implements OnInit {
  requestState!: 'loading' | 'failed' | 'fulfilled';
  currentPlace$!: EventEmitter<PlaceSuggestion>;

  fiveDaysForecastSub!: Subscription;

  fiveDaysForecast: DayForecast[] = [];
  dayInfoParametrs: Array<string> = [];

  constructor(
    public weatherService: WeatherService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    if (!this.weatherService.DailyStepForecast) {
      this.requestState = 'loading';
    } else {
      this.requestState = 'fulfilled';
    }
    
    this.fiveDaysForecastSub = this.locationService.locationChange$
      .pipe(
        switchMap((place) =>
          this.weatherService.getForecastByCoorDayInterval(
            place.cords.lat,
            place.cords.lon,
            5,
          )
        )
      ) 
      .subscribe({
        next: ({ data }) => {
          this.weatherService.DailyStepForecast = data;
          this.requestState = 'fulfilled';
        },
        error: () => (this.requestState = 'failed'),
      });
  }

  ngOnDestroy(): void {
    this.fiveDaysForecastSub.unsubscribe();
  }
}
