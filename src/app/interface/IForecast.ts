import {ICoord, ICurrentWeather} from "./ICurrentWeather";

export interface IForecast {
  cod?: number | string; // Internal parameter
  message?: string; //Internal parameter
  cntA?: number; //number of timestamps returned in the API response
  list: ICurrentWeather[];
  city?: ICity;
}

export interface ICity{
  id: number;
  name: string;
  coord: ICoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}