export interface ICurrentWeather{
  coord: ICoord;
  weather: IWeather[]; //(more info Weather condition codes https://openweathermap.org/weather-conditions)  
  base: string; // Internal parameter
  main: IWeatherMain;
  visibility?: number; //Visibility, meter. The maximum value of the visibility is 10km
  wind?: IWind;
  clouds?: IClouds;
  rain?: IRain;
  snow?: ISnow;
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

export interface IWeather{
  id: number;          // Weather condition id
  main: string ;       // Group of weather parameters (Rain, Snow, Extreme etc.)
  description: string; // Weather condition within the group. You can get the output in your language. Learn more
  icon: string;        // Weather icon id
}

export interface ICoord{
  lon: number; // City geo location, longitude
  lat: number; // City geo location, latitude
}

export interface IWind{
  speed: number; //Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
  deg: number;   //Wind direction, degrees (meteorological)
  gust: number;  //Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
}

export interface IClouds{
  all: number; // Cloudiness, %
}

export interface IRain{
  oneH: number;     // Rain volume for the last 1 hour, mm
  threeH?: number;  // Rain volume for the last 3 hours, mm
} 

export interface ISnow{
  oneH: number;     // Snow volume for the last 1 hour, mm
  threeH?: number;  // Snow volume for the last 3 hour, mm
}

export interface IWeatherMain{
  temp: number;       //Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
  feels_like: number; //Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
  pressure: number;   //Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
  humidity: number;   //Humidity, %
  temp_min: number;   //Minimum temperature at the moment. This is minimal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
  temp_max: number;   //Maximum temperature at the moment. This is maximal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
  sea_level: number;  //Atmospheric pressure on the sea level, hPa
  grnd_level: number; //Atmospheric pressure on the ground level, hPa
}