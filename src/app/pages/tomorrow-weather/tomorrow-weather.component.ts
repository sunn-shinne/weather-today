import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-tomorrow-weather',
  templateUrl: './tomorrow-weather.component.html',
  styleUrls: ['./tomorrow-weather.component.scss']
})
export class TomorrowWeatherComponent implements OnInit, OnDestroy {
  requestState: 'loading' | 'failed' | 'fulfilled' = 'loading';

  airPpollutionSub!: Subscription;

  constructor(
    public weatherService: WeatherService,
    private locationService: LocationService
    ) { }

  ngOnInit(): void {
    this.airPpollutionSub = this.locationService.locationChange$
      .pipe(
        switchMap((place) =>
          this.weatherService.getHistoricalAirPollution(
            place.cords.lat,
            place.cords.lon,
            1596029995,
            Math.floor(new Date().getTime() / 1000)
          )
        )
      )
      .subscribe({
        next: ({ list }) => {
          this.weatherService.AirPollutionHistory = list;
          this.requestState = 'fulfilled';
          console.log(list)
        },
        error: () => (this.requestState = 'failed'),
      });
  }

  ngOnDestroy(): void {
    this.airPpollutionSub.unsubscribe();
  }

}
