import {Coord, CurrentWeather} from "./CurrentWeather";

export interface Forecast {
  cod?: number | string; // Internal parameter
  message?: string; //Internal parameter
  cntA?: number; //number of timestamps returned in the API response
  list: CurrentWeather[];
  city?: City;
}

export interface City{
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}