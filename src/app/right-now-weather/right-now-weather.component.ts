import { Component, Input, OnInit } from '@angular/core';
import { RightNowWeather } from '../interfaces/RightNowWeather';
import { LocationService } from '../services/location.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-right-now-weather',
  templateUrl: './right-now-weather.component.html',
  styleUrls: ['./right-now-weather.component.scss'],
})
export class RightNowWeatherComponent implements OnInit {
  @Input() forecast!: RightNowWeather;

  constructor(
    public locationService: LocationService,
    public weatherService: WeatherService
  ) {}

  ngOnInit(): void {}
}
