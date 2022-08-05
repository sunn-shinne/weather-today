import { Component, Input, OnInit } from '@angular/core';
import { SunriseSunset } from '../../interfaces/SunriseSunset';
import { LocationService } from '../../services/location.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-sunrise-weather',
  templateUrl: './sunrise-weather.component.html',
  styleUrls: ['./sunrise-weather.component.scss'],
})
export class SunriseWeatherComponent implements OnInit {
  @Input() sunriseSunsetTime!: SunriseSunset;

  constructor(public locationService: LocationService) {}

  ngOnInit(): void {}
}
