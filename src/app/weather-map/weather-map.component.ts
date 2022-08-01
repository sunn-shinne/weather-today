import { Component } from '@angular/core';
import { LocationService } from '../services/location.service';
import { environment } from 'src/environments/environment';
import * as L from 'leaflet';

@Component({
  selector: 'app-weather-map',
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.scss'],
})
export class WeatherMapComponent {
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 12,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }),
    ],
    zoom: 10,
    center: L.latLng(
      this.locationService.currentLocation.cords.lat,
      this.locationService.currentLocation.cords.lon
    ),
  };

  baseLayers = {
    Precipitation: L.tileLayer(
      `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${environment.openWeather.API_key}`,
      { maxZoom: 12 }
    ),
    Temperature: L.tileLayer(
      `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${environment.openWeather.API_key}`,
      { maxZoom: 12 }
    ),
    'Wind speed': L.tileLayer(
      `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${environment.openWeather.API_key}`,
      { maxZoom: 12 }
    ),
    Clouds: L.tileLayer(
      `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${environment.openWeather.API_key}`,
      { maxZoom: 12 }
    ),
    'Sea level pressure': L.tileLayer(
      `https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${environment.openWeather.API_key}`,
      { maxZoom: 12 }
    ),
  };

  constructor(public locationService: LocationService) {}
}
