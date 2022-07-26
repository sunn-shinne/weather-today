import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, {
  Pagination,
  Navigation,
  Virtual,
  SwiperOptions,
} from 'swiper';
import { WeatherService } from '../services/weather.service';
import { Forecast } from '../interfaces/Forecast';

SwiperCore.use([Pagination, Navigation, Virtual]);

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HourlyForecastComponent {
  @ViewChild('swiperRef', { static: false }) swiper?: SwiperComponent;

  @Input() forecast: Forecast = {} as Forecast;

  config: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 30,
    navigation: true,
    grabCursor: true,
    virtual: true,
    breakpoints: {
      1240: {
        slidesPerView: 5,
      },
      1000: {
        slidesPerView: 4,
      },
      560: {
        slidesPerView: 3,
      },
    },
  };

  constructor(public weatherService: WeatherService) {}

  addSignToTemp(temp: number): string {
    return `${Math.sign(temp) >= 0 ? '+' : '-'}${Math.round(temp)}`;
  }

  addWiOwm(code: any): any {
    return `wi-owm-${code}`;
  }
}
