import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentWeather } from '../interfaces/CurrentWeather';
import { Forecast } from '../interfaces/Forecast';
import { AirPollution } from '../interfaces/AirPollution';
import { RightNowWeather } from '../interfaces/RightNowWeather';
import { DailyStepForecast, DayForecast } from '../interfaces/DailyStepForecast';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  rightNowWeather!: RightNowWeather;
  weatherForecast!: Forecast;
  DailyStepForecast!: DayForecast[];

  constructor(private http: HttpClient) {}

  getCurrentWeatherByCoordinates(
    latitude: string | number,
    longitude: string | number,
    langShort: string = 'en'
  ): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${langShort}&units=metric&appid=${environment.openWeather.API_key}`
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

  getForecastByCoordinates(
    latitude: string | number,
    longitude: string | number,
    langShort: string = 'en',
    numberOfTimestamps: number = 6
  ): Observable<Forecast> {
    return this.http.get<Forecast>(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=${langShort}&cnt=${numberOfTimestamps}&units=metric&appid=${environment.openWeather.API_key}`
    );
  }

  getCurrentAirPollution(
    latitude: string | number,
    longitude: string | number
  ): Observable<AirPollution> {
    return this.http.get<AirPollution>(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${environment.openWeather.API_key}`
    );
  }

  getForecastAirPollution(
    latitude: string | number,
    longitude: string | number
  ): Observable<AirPollution> {
    return this.http.get<AirPollution>(
      `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=${environment.openWeather.API_key}`
    );
  }

  getHistoricalAirPollution(
    latitude: string | number,
    longitude: string | number,
    startUnixTime: number,
    endUnixTime: number
  ): Observable<AirPollution> {
    //Start/end date (unix time, UTC time zone), e.g. start=1606488670
    return this.http.get<AirPollution>(
      `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${latitude}&lon=${longitude}&start=${startUnixTime}&end=${endUnixTime}&appid=${environment.openWeather.API_key}`
    );
  }

  getForecastByCoorDayInterval(
    latitude: string | number,
    longitude: string | number,
    numberOfDays: number = 16,
    units: string = 'M',
    language: string = 'en'
  ): Observable<DailyStepForecast> {
    // 500 calls/day
    return this.http.get<DailyStepForecast>(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&units=${units}&days=${numberOfDays}&lang=${language}&key=${environment.weatherbit.API_key}`
    );
  }
}
