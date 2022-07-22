import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentWeather } from '../interface/CurrentWeather';
import { Forecast } from '../interface/Forecast';
import { CityCoordinates } from '../interface/CityCoordinates';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  //private currentWeather: BehaviorSubject<ICurrentWeather> = new BehaviorSubject<ICurrentWeather>
  //currentWeather$: Observable<ICurrentWeather> = this.currentWeather.asObservable()

  getCurrentWeather(latitude: string, longitude: string, langShort: string): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${langShort}&units=metric&appid=${environment.openWeather.API_key}`);
  }

  getForecast(latitude: string, longitude: string, langShort: string): Observable<Forecast>{
    return this.http.get<Forecast>(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=${langShort}&units=metric&appid=${environment.openWeather.API_key}`);
  }

  getCoordinatesByLocationName(cityName: string, countryCode: string): Observable<CityCoordinates>{
    return this.http.get<CityCoordinates>(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&limit=1&appid=${environment.openWeather.API_key}`)
  }

}
