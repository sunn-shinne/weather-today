import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentWeather } from '../interface/CurrentWeather';
import { Forecast } from '../interface/Forecast';
import { CityCoordinates } from '../interface/CityCoordinates';
import { AirPollution } from '../interface/AirPollution';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  //private currentWeather: BehaviorSubject<ICurrentWeather> = new BehaviorSubject<ICurrentWeather>
  //currentWeather$: Observable<ICurrentWeather> = this.currentWeather.asObservable()

  getCurrentWeatherByCoordinates(latitude: string | number, longitude: string | number, langShort: string = "en"): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${langShort}&units=metric&appid=${environment.openWeather.API_key}`);
  }

  getCurrentWeatherByCity(cityName: string): Observable<CurrentWeather>{
    return this.http.get<CurrentWeather>(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${environment.openWeather.API_key}`)
  }

  getForecastByCoordinates(latitude: string | number, longitude: string | number, langShort: string = "en", numberOfTimestamps: number): Observable<Forecast>{
    return this.http.get<Forecast>(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=${langShort}&cnt=${numberOfTimestamps}&units=metric&appid=${environment.openWeather.API_key}`);
  }

  getForecastByCity(cityName: string, numberOfTimestamps: number,): Observable<Forecast>{
    return this.http.get<Forecast>(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=${numberOfTimestamps}&appid=${environment.openWeather.API_key}`);
  }

  getCoordinatesByLocationName(cityName: string, limit: number = 1): Observable<CityCoordinates[]>{
    return this.http.get<CityCoordinates[]>(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${environment.openWeather.API_key}`)
  }

  getLocationNameByCoordinates(latitude: string | number, longitude: string | number, limit: number = 1 ): Observable<CityCoordinates[]>{
    return this.http.get<CityCoordinates[]>(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${limit}&appid=${environment.openWeather.API_key}`)
  }

  getCurrentAirPollution(latitude: string | number, longitude: string | number): Observable<AirPollution>{
    return this.http.get<AirPollution>(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${environment.openWeather.API_key}`)
  }

  getForecastAirPollution(latitude: string | number, longitude: string | number): Observable<AirPollution>{
    return this.http.get<AirPollution>(`http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=${environment.openWeather.API_key}`)
  }

  getHistoricalAirPollution(latitude: string | number, longitude: string | number, startUnixTime: number, endUnixTime: number ): Observable<AirPollution>{ //Start/end date (unix time, UTC time zone), e.g. start=1606488670
    return this.http.get<AirPollution>(`http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${latitude}&lon=${longitude}&start=${startUnixTime}&end=${endUnixTime}&appid=${environment.openWeather.API_key}`)
  }

}
