import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentWeather } from '../interfaces/CurrentWeather';
import { Forecast } from '../interfaces/Forecast';
import { AirList, AirPollution } from '../interfaces/AirPollution';
import { RightNowWeather } from '../interfaces/RightNowWeather';
import { SunriseSunset } from '../interfaces/SunriseSunset';
import {
  DailyStepForecast,
  DayForecast,
} from '../interfaces/DailyStepForecast';
import { TranslateService } from '@ngx-translate/core';
import { Hour, HourlyForecast } from '../interfaces/HourlyForecast';

interface TodayWeather {
  rightNowWeather: RightNowWeather;
  hourlyForcast: Forecast;
  sunriseSunsetTime: SunriseSunset;
}

interface ChartsData {
  hourlyForecast: Hour[];
  airPolution: any;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  todayWeather: TodayWeather = {} as TodayWeather;
  dailyStepForecast!: DayForecast[];
  chartsData: ChartsData = {} as ChartsData;

  constructor(private http: HttpClient, private translate: TranslateService) {}

  getCurrentWeatherByCoordinates(
    latitude: string | number,
    longitude: string | number
  ): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(
      //`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${this.translate.currentLang}&units=metric&appid=${environment.openWeather.API_key}`
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          lat: latitude,
          lon: longitude,
          lang: this.translate.currentLang,
          units: 'metric',
          appid: environment.openWeather.API_key,
        },
      }
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
    numberOfTimestamps: number = 6
  ): Observable<Forecast> {
    return this.http.get<Forecast>(
      //`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=${this.translate.currentLang}&cnt=${numberOfTimestamps}&units=metric&appid=${environment.openWeather.API_key}`
      'https://api.openweathermap.org/data/2.5/forecast',
      {
        params: {
          lat: latitude,
          lon: longitude,
          lang: this.translate.currentLang,
          cnt: numberOfTimestamps,
          units: 'metric',
          appid: environment.openWeather.API_key,
        },
      }
    );
  }

  getSunriseAndSunset(
    latitude: string | number,
    longitude: string | number
  ): Observable<SunriseSunset> {
    return this.http.get<SunriseSunset>(
      // `https://api.ipgeolocation.io/astronomy?apiKey=${environment.ipgeolocation.API_key}&lat=${latitude}&long=${longitude}`
      'https://api.ipgeolocation.io/astronomy',
      {
        params: {
          apiKey: environment.ipgeolocation.API_key,
          lat: latitude,
          long: longitude,
        },
      }
    );
  }

  getCurrentAirPollution(
    latitude: string | number,
    longitude: string | number
  ): Observable<AirPollution> {
    return this.http.get<AirPollution>(
      //`https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${environment.openWeather.API_key}`
      'https://api.openweathermap.org/data/2.5/air_pollution',
      {
        params: {
          lat: latitude,
          lon: longitude,
          appid: environment.openWeather.API_key,
        },
      }
    );
  }

  getForecastAirPollution(
    latitude: string | number,
    longitude: string | number
  ): Observable<AirPollution> {
    return this.http.get<AirPollution>(
      //`https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=${environment.openWeather.API_key}`
      'https://api.openweathermap.org/data/2.5/air_pollution/forecast',
      {
        params: {
          lat: latitude,
          lon: longitude,
          appid: environment.openWeather.API_key,
        },
      }
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
      //`https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${latitude}&lon=${longitude}&start=${startUnixTime}&end=${endUnixTime}&appid=${environment.openWeather.API_key}`
      'https://api.openweathermap.org/data/2.5/air_pollution/history',
      {
        params: {
          lat: latitude,
          lon: longitude,
          start: startUnixTime,
          end: endUnixTime,
          appid: environment.openWeather.API_key,
        },
      }
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
      //`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&units=${units}&days=${numberOfDays}&lang=${this.translate.currentLang}&key=${environment.weatherbit.API_key}`
      'https://api.weatherbit.io/v2.0/forecast/daily',
      {
        params: {
          lat: latitude,
          lon: longitude,
          units: units,
          days: numberOfDays,
          lang: this.translate.currentLang,
          key: environment.weatherbit.API_key,
        },
      }
    );
  }

  getHourlyForecast(
    latitude: string | number,
    longitude: string | number,
    numberOfDays: number = 5
  ): Observable<HourlyForecast> {
    return this.http.get<HourlyForecast>(
      `https://api.weatherapi.com/v1/forecast.json`,
      {
        params: {
          q: `${latitude},${longitude}`,
          days: numberOfDays,
          lang: this.translate.currentLang,
          key: environment.weatherapi.API_key,
        },
      }
    );
  }
}
