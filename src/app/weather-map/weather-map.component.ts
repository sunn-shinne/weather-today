import { Component, OnDestroy } from '@angular/core';
import { LocationService } from '../services/location.service';
import { environment } from 'src/environments/environment';

import * as L from 'leaflet';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-map',
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.scss'],
})
export class WeatherMapComponent implements OnDestroy {
  map!: L.Map;
  locationSub!: Subscription;

  latitude: number = this.locationService.currentLocation.cords.lat;
  longitude: number = this.locationService.currentLocation.cords.lon;

  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 12,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }),
    ],
    zoom: 10,
    center: L.latLng(this.latitude, this.longitude),
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

  constructor(public locationService: LocationService) {
    this.locationSub = locationService.locationChange$.subscribe((place) => {
      if (this.map) {
        const newLat = place.cords.lat;
        const newLon = place.cords.lon;
        this.map.panTo(new L.LatLng(newLat, newLon));
      }
    });
  }

  onMapReady(map: L.Map) {
    this.map = map;
  }

  ngOnDestroy(): void {
    this.locationSub.unsubscribe();
  }
}
