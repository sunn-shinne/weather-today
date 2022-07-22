import { Component, OnInit } from '@angular/core';
import { CityCoordinates } from 'src/app/interface/CityCoordinates';
import { CurrentWeather } from 'src/app/interface/CurrentWeather';
import { Forecast } from 'src/app/interface/Forecast';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  currentWeather: CurrentWeather = {} as CurrentWeather;
  forecast: Forecast = {} as Forecast;
  cityCoordinates: CityCoordinates = {} as CityCoordinates;

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getCoordinatesByLocationName('Izhevsk', 'RU').subscribe({
      next: (value) => this.cityCoordinates = value,
      error: (err) => console.log(err),
      complete: () => console.log(this.cityCoordinates)
   });
  }

}
