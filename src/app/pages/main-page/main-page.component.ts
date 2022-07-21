import { Component, OnInit } from '@angular/core';
import { ICityCoordinates } from 'src/app/interface/ICityCoordinates';
import { ICurrentWeather } from 'src/app/interface/ICurrentWeather';
import { IForecast } from 'src/app/interface/IForecast';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  currentWeather: ICurrentWeather = {} as ICurrentWeather;
  forecast: IForecast = {} as IForecast;
  cityCoordinates: ICityCoordinates = {} as ICityCoordinates;

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getCoordinatesByLocationName('Izhevsk', 'RU').subscribe({
      next: (value) => this.cityCoordinates = value,
      error: (err) => console.log(err),
      complete: () => console.log(this.cityCoordinates)
   });
  }

}
