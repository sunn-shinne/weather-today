import { Component, Input, OnInit } from '@angular/core';
import { RightNowWeather } from '../interfaces/RightNowWeather';

@Component({
  selector: 'app-right-now-weather',
  templateUrl: './right-now-weather.component.html',
  styleUrls: ['./right-now-weather.component.scss'],
})
export class RightNowWeatherComponent implements OnInit {
  @Input() rightNowWeather!: RightNowWeather;
  @Input() city!: string;

  constructor() {}

  ngOnInit(): void {}
}
