export interface fiveDaysForecast{
  lat: number; //Latitude (Degrees)
  lon: number; //Longitude (Degrees)
  timezone: string; //Local IANA Timezone
  city_name: string; //Nearest city
  country_code: string; //Country abbreviation
  state_code?: string;//State abbreviation/code
  data: DayForecast[];
}

export interface DayForecast{
  valid_date: string; //Local date the forecast is valid for in format YYYY-MM-DD
  ts: number; //Forecast period start unix timestamp (UTC)
  datetime: string;//[DEPRECATED] Forecast valid date (YYYY-MM-DD)
  wind_spd: number; //Wind speed (Default m/s)
  wind_dir: number; //Wind direction (degrees)
  wind_cdir: string; //Abbreviated wind direction
  wind_cdir_full:  string; //Verbal wind direction
  temp: number; //Average Temperature (default Celcius)
  max_temp: number; //Maximum Temperature - Calculated from Midnight to Midnight local time (default Celcius)
  min_temp: number; //Minimum Temperature - Calculated from Midnight to Midnight local time (default Celcius)
  high_temp: number; //High Temperature "Day-time High" - Calculated from 7 AM to 7 PM local time (default Celcius)
  low_temp: number; //Low Temperature "Night-time Low" - Calculated from 7 PM to 7 AM local (default Celcius)
  app_max_temp: number; //Apparent/"Feels Like" temperature at max_temp time (default Celcius)
  app_min_temp: number; //Apparent/"Feels Like" temperature at min_temp time (default Celcius)
  pop: number; //Probability of Precipitation (%)
  precip: number; //Accumulated liquid equivalent precipitation (default mm)
  snow: number; //Accumulated snowfall (default mm)
  snow_depth: number; //Snow Depth (default mm)
  pres: number; //Average pressure (mb)
  slp: number; //Average sea level pressure (mb)
  dewpt: number; //Average dew point (default Celcius)
  rh: number; //Average relative humidity (%)
  wind_gust_spd: number; //Wind gust speed (Default m/s)
  weather: {
    icon: string; //Weather icon code
    code: number; //Weather code
    description: string; //Text weather description
  }
  clouds_low: number; //Low-level (~0-3km AGL) cloud coverage (%)
  clouds_mid: number; //Mid-level (~3-5km AGL) cloud coverage (%)
  clouds_hi: number; //High-level (>5km AGL) cloud coverage (%)
  clouds: number; //Average total cloud coverage (%)
  vis: number; //Visibility (default KM)
  max_dhi?: number | null; //[DEPRECATED] Maximum direct component of solar radiation (W/m^2)
  uv: number; //Maximum UV Index (0-11+)
  ozone: number; //Average Ozone (Dobson units)
  moon_phase: number; //Moon phase illumination fraction (0-1)
  moon_phase_lunation: number; //Moon lunation fraction (0 = New moon, 0.50 = Full Moon, 0.75 = Last quarter moon)
  moonrise_ts: number; //Moonrise time unix timestamp (UTC)
  moonset_ts: number; //Moonset time unix timestamp (UTC)
  sunrise_ts: number; //Sunrise time unix timestamp (UTC)
  sunset_ts: number; //Sunset time unix timestamp (UTC)
}