import { Component, OnInit } from '@angular/core';
import { CityCoordinates } from 'src/app/interfaces/CityCoordinates';
import { CurrentWeather } from 'src/app/interfaces/CurrentWeather';
import { RightNowWeather } from 'src/app/interfaces/RightNowWeather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-today-weather',
  templateUrl: './today-weather.component.html',
  styleUrls: ['./today-weather.component.scss'],
})
export class TodayWeatherComponent implements OnInit {
  isLoading: boolean = false;
  cityCoordinates: CityCoordinates[] = [];

  weatherData: CurrentWeather = {} as CurrentWeather;
  rightNowWeather: RightNowWeather = {} as RightNowWeather;

  constructor(public weatherService: WeatherService) {}

  ngOnInit(): void {
    this.isLoading = true;
    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        const crd = pos.coords;
        this.weatherService
          .getLocationNameByCoordinates(crd.latitude, crd.longitude)
          .subscribe((res) => {
            this.cityCoordinates = res;
          });

        this.weatherService
          .getCurrentWeatherByCoordinates(crd.latitude, crd.longitude, 'en')
          .subscribe({
            next: (value) => this.setWeatherData(value),
            complete: () => {
              this.isLoading = false;
              console.log(this.weatherData);
            },
          });
      },
      (err) => {
        this.weatherService.getCurrentWeatherByCity('Moscow').subscribe({
          next: (value) => this.setWeatherData(value),
          complete: () => {
            this.isLoading = false;
            console.log(this.weatherData);
          },
        });
      }
    );
  }

  setWeatherData(data: CurrentWeather) {
    this.weatherData = data;
    this.rightNowWeather =
      this.weatherService.normolizeRightNowWeatherData(data);
  }
}
