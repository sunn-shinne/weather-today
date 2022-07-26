export interface RightNowWeather {
  icon_code: string;
  description: string;
  temp: string;
  feels_like: string;
  humidity: number;
  pressure: number;
  visibility?: number;
  wind: {
    speed?: number;
    deg?: number;
  };
}
