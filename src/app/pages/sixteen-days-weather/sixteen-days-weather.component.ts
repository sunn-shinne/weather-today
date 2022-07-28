import { Component, EventEmitter, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { DayForecast } from 'src/app/interfaces/DailyStepForecast';
import { LocationService } from 'src/app/services/location.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-sixteen-days-weather',
  templateUrl: './sixteen-days-weather.component.html',
  styleUrls: ['./sixteen-days-weather.component.scss'],
})
export class SixteenDaysWeatherComponent implements OnInit {
  requestState!: 'loading' | 'failed' | 'fulfilled';

  sixteenDaysForecastSub!: Subscription;

  sixteenDaysForecast: DayForecast[] = [];
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
    
    this.sixteenDaysForecastSub = this.locationService.locationChange$
      .pipe(
        switchMap((place) =>
          this.weatherService.getForecastByCoorDayInterval(
            place.cords.lat,
            place.cords.lon,
            16,
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
    this.sixteenDaysForecastSub.unsubscribe();
  }
}
