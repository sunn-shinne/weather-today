import { Component, EventEmitter, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { DailyStepForecast, DayForecast } from 'src/app/interfaces/DailyStepForecast';
import { PlaceSuggestion } from 'src/app/interfaces/PlaceSuggestion';
import { LocationService } from 'src/app/services/location.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-five-days-weather',
  templateUrl: './five-days-weather.component.html',
  styleUrls: ['./five-days-weather.component.scss'],
})
export class FiveDaysWeatherComponent implements OnInit {
  isLoading: boolean = false;
  currentPlace$!: EventEmitter<PlaceSuggestion>;

  fiveDaysForecastSub!: Subscription;

  fiveDaysForecast: DayForecast[] = [];
  dayInfoParametrs: Array<string> = [];

  constructor(
    public weatherService: WeatherService,
    private locationService: LocationService
  ) {
    this.currentPlace$ = this.locationService.locationChange$;
  }

  ngOnInit(): void {
    this.isLoading = false;
    
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
      .subscribe((data) => {
        this.fiveDaysForecast = data.data;
        this.dayInfoParametrs = Object.keys(data.data[0])
      }); //this.fiveDaysForecast = data
  }
}
