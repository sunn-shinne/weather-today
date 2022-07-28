import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentWeather } from '../interfaces/CurrentWeather';
import { Forecast } from '../interfaces/Forecast';
import { AirPollution } from '../interfaces/AirPollution';
import { RightNowWeather } from '../interfaces/RightNowWeather';
import { SunriseSunset } from '../interfaces/SunriseSunset';
import {
  DailyStepForecast,
  DayForecast,
} from '../interfaces/DailyStepForecast';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  rightNowWeather!: RightNowWeather;
  weatherForecast!: Forecast;
  sunriseSunsetTime!: SunriseSunset;
  DailyStepForecast!: DayForecast[];

  constructor(private http: HttpClient, private translate: TranslateService) {}

  getCurrentWeatherByCoordinates(
    latitude: string | number,
    longitude: string | number
  ): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${this.translate.currentLang}&units=metric&appid=${environment.openWeather.API_key}`
    );
  }

  normolizeRightNowWeatherData(data: CurrentWeather): RightNowWeather {
    return {
      icon_code: `wi-owm-${data.weather[0].id}`,
      description: data.weather[0].description,
      temp: `${Math.sign(data.main.temp) >= 0 ? '+' : '-'}${Math.round(
        data.main.temp
      )}`,
      feels_like: `${Math.sign(data.main.feels_like) >= 0 ? '+' : '-'
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
    numberOfTimestamps: number = 6
  ): Observable<Forecast> {
    return this.http.get<Forecast>(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=${this.translate.currentLang}&cnt=${numberOfTimestamps}&units=metric&appid=${environment.openWeather.API_key}`
    );
  }

  getSunriseAndSunset(
    latitude: string | number,
    longitude: string | number,
  ): Observable<SunriseSunset> {
    return this.http.get<SunriseSunset>(
      `http://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=today&formatted=0`
    )
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
    units: string = 'M'
  ): Observable<DailyStepForecast> {
    // 500 calls/day
    return this.http.get<DailyStepForecast>(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&units=${units}&days=${numberOfDays}&lang=${this.translate.currentLang}&key=${environment.weatherbit.API_key}`
    );
  }
}
