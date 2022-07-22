export interface CurrentWeather{
  coord: Coord;
  weather: Weather[]; //(more info Weather condition codes https://openweathermap.org/weather-conditions)  
  base: string; // Internal parameter
  main: WeatherMain;
  visibility?: number; //Visibility, meter. The maximum value of the visibility is 10km
  wind?: Wind;
  clouds?: Clouds;
  rain?: Rain;
  snow?: Snow;
  dt: number; // Time of data calculation, unix, UTC
  sys:{
    type?: number; //Internal parameter
    id?: number; //Internal parameter
    message?: number; //Internal parameter
    country: string; // Country code (GB, JP etc.)
    sunrise: number; // Sunrise time, unix, UTC
    sunset: number; // Sunset time, unix, UTC
  }
  timezone: number; // Shift in seconds from UTC
  id: number; // City ID
  name: string; // City name
  cod: number | string; //Internal parameter
}

export interface Weather{
  id: number;          // Weather condition id
  main: string ;       // Group of weather parameters (Rain, Snow, Extreme etc.)
  description: string; // Weather condition within the group. You can get the output in your language. Learn more
  icon: string;        // Weather icon id
}

export interface Coord{
  lon: number; // City geo location, longitude
  lat: number; // City geo location, latitude
}

export interface Wind{
  speed: number; //Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
  deg: number;   //Wind direction, degrees (meteorological)
  gust: number;  //Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
}

export interface Clouds{
  all: number; // Cloudiness, %
}

export interface Rain{
  oneH: number;     // Rain volume for the last 1 hour, mm
  threeH?: number;  // Rain volume for the last 3 hours, mm
} 

export interface Snow{
  oneH: number;     // Snow volume for the last 1 hour, mm
  threeH?: number;  // Snow volume for the last 3 hour, mm
}

export interface WeatherMain{
  temp: number;       //Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
  feels_like: number; //Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
  pressure: number;   //Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
  humidity: number;   //Humidity, %
  temp_min: number;   //Minimum temperature at the moment. This is minimal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
  temp_max: number;   //Maximum temperature at the moment. This is maximal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
  sea_level: number;  //Atmospheric pressure on the sea level, hPa
  grnd_level: number; //Atmospheric pressure on the ground level, hPa
}