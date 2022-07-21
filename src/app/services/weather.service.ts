import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICurrentWeather } from '../interface/ICurrentWeather';
import { IForecast } from '../interface/IForecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  //private currentWeather: BehaviorSubject<ICurrentWeather> = new BehaviorSubject<ICurrentWeather>
  //currentWeather$: Observable<ICurrentWeather> = this.currentWeather.asObservable()

  getCurrentWeather(latitude: string, longitude: string, langShort: string): Observable<ICurrentWeather> {
    return this.http.get<ICurrentWeather>(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${langShort}&units=metric&appid=${environment.openWeather.API_key}`);
  }

  getForecast(latitude: string, longitude: string, langShort: string): Observable<IForecast>{
    return this.http.get<IForecast>(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=${langShort}&units=metric&appid=${environment.openWeather.API_key}`);
  }

  getCoordinatesByLocationName(cityName: string, countryCode: string): Observable<any>{
    return this.http.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&limit=1&appid=${environment.openWeather.API_key}`)
  }

}
