import { Component, OnInit } from '@angular/core';
import { mergeMap, concatMap } from 'rxjs';
import { CityCoordinates } from 'src/app/interface/CityCoordinates';
import { CurrentWeather } from 'src/app/interface/CurrentWeather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-today-weather',
  templateUrl: './today-weather.component.html',
  styleUrls: ['./today-weather.component.scss']
})
export class TodayWeatherComponent implements OnInit {
  currentWeather: CurrentWeather = {} as CurrentWeather;
  cityCoordinates: CityCoordinates[] = []
  crd: any;

  constructor(public  weatherService:  WeatherService) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        this.crd = pos.coords;
        this.weatherService.getCurrentWeatherByCoordinates(this.crd.latitude, this.crd.longitude, 'ru').subscribe({
          next: (value) => this.currentWeather = value,
          complete: () => console.log(this.currentWeather) // TODO: Show data in template
        });
      },
      (err) => {
        this.weatherService.getCurrentWeatherByCity('Moscow').subscribe({
          next: (value) => this.currentWeather = value,
          complete: () => console.log(this.currentWeather) // TODO: Show data in template
        });
      }, 
    )   
  }

}
