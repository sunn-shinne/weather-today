import { Component, Input, OnInit } from '@angular/core';
import { SunriseSunset } from '../interfaces/SunriseSunset';
import { LocationService } from '../services/location.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-sunrise-weather',
  templateUrl: './sunrise-weather.component.html',
  styleUrls: ['./sunrise-weather.component.scss']
})
export class SunriseWeatherComponent implements OnInit {
  @Input() sunriseSunsetTime!: SunriseSunset;
  time: any;

  constructor(
    public weatherService: WeatherService,
    public locationService: LocationService) {

  }

  ngOnInit(): void {
    this.time = this.toTime(new Date(this.weatherService.sunriseSunsetTime.results.sunset).valueOf() - new Date(this.weatherService.sunriseSunsetTime.results.sunrise).valueOf())
  }

  toTime(seconds: any) {
    return new Date(seconds).toISOString().substr(11, 8);
  }

}
