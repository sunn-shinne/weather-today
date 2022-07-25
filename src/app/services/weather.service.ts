import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentWeather } from '../interfaces/CurrentWeather';
import { Forecast } from '../interfaces/Forecast';
import { CityCoordinates } from '../interfaces/CityCoordinates';
import { AirPollution } from '../interfaces/AirPollution';
import { RightNowWeather } from '../interfaces/RightNowWeather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  //private currentWeather: BehaviorSubject<ICurrentWeather> = new BehaviorSubject<ICurrentWeather>
  //currentWeather$: Observable<ICurrentWeather> = this.currentWeather.asObservable()

  getCurrentWeatherByCoordinates(latitude: string | number, longitude: string | number, langShort: string = "en"): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${langShort}&units=metric&appid=${environment.openWeather.API_key}`);
  }

  getCurrentWeatherByCity(cityName: string): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${environment.openWeather.API_key}`
    );
  }


  normolizeRightNowWeatherData(data: CurrentWeather): RightNowWeather {
    return {
      icon_code: `wi-owm-${data.weather[0].id}`,
      description: data.weather[0].description,
      temp: `${Math.sign(data.main.temp) >= 0 ? '+' : '-'}${Math.round(
        data.main.temp
      )}`,
      feels_like: `${
        Math.sign(data.main.feels_like) >= 0 ? '+' : '-'
      }${Math.round(data.main.feels_like)}`,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      visibility: data.visibility,
      wind: {
        speed: data.wind?.speed,
        deg: data.wind?.deg,
      },
    };
  }
  
  getForecastByCoordinates(latitude: string | number, longitude: string | number, langShort: string = "en", numberOfTimestamps: number): Observable<Forecast>{
    return this.http.get<Forecast>(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=${langShort}&cnt=${numberOfTimestamps}&units=metric&appid=${environment.openWeather.API_key}`);
  }

  getForecastByCity(cityName: string, numberOfTimestamps: number,): Observable<Forecast>{
    return this.http.get<Forecast>(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=${numberOfTimestamps}&units=metric&appid=${environment.openWeather.API_key}`);
  }

  getCoordinatesByLocationName(cityName: string, limit: number = 1): Observable<CityCoordinates[]>{
    return this.http.get<CityCoordinates[]>(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${environment.openWeather.API_key}`)
  }

  getLocationNameByCoordinates(latitude: string | number, longitude: string | number, limit: number = 1 ): Observable<CityCoordinates[]>{
    return this.http.get<CityCoordinates[]>(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${limit}&appid=${environment.openWeather.API_key}`)
  }

  getCurrentAirPollution(latitude: string | number, longitude: string | number): Observable<AirPollution>{
    return this.http.get<AirPollution>(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${environment.openWeather.API_key}`)
  }

  getForecastAirPollution(latitude: string | number, longitude: string | number): Observable<AirPollution>{
    return this.http.get<AirPollution>(`https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=${environment.openWeather.API_key}`)
  }

  getHistoricalAirPollution(latitude: string | number, longitude: string | number, startUnixTime: number, endUnixTime: number ): Observable<AirPollution>{ //Start/end date (unix time, UTC time zone), e.g. start=1606488670
    return this.http.get<AirPollution>(`https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${latitude}&lon=${longitude}&start=${startUnixTime}&end=${endUnixTime}&appid=${environment.openWeather.API_key}`)
  }

  getForecastByСityDayInterval(cityName: string, numberOfDays: number = 16, units: string = 'M', language: string = 'en'): Observable<any>{
    // 500 calls/day
    return this.http.get<any>(`https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&units=${units}&days=${numberOfDays}&lang=${language}&key=${environment.weatherbit.API_key}`);
  }

  getForecastByCoorDayInterval(latitude: string | number, longitude: string | number, numberOfDays: number = 16, units: string = 'M', language: string = 'en'): Observable<any>{
    // 500 calls/day
    return this.http.get<any>(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&units=${units}&days=${numberOfDays}&lang=${language}&key=${environment.weatherbit.API_key}`);
  }
}
