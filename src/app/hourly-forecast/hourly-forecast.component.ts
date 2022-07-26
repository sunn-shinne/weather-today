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
export class HourlyForecastComponent implements OnInit, OnDestroy {
  forecast: Forecast = {} as Forecast;

  @ViewChild('swiperRef', { static: false }) swiper?: SwiperComponent;

  @Input() city!: string;

  config: SwiperOptions = {
    slidesPerView: 2,
    //centeredSlides: true,
    spaceBetween: 30,
    navigation: true,
    grabCursor: true,
    //pagination: { type: 'fraction'},
    //scrollbar: { draggable: true },
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

  ngOnInit(): void {
    this.weatherService.getForecastByCity(this.city, 6).subscribe((res) => {
      this.forecast = res;
      // console.log(res)
    });
  }

  ngOnDestroy(): void {}

  addSignToTemp(temp: number): string {
    return `${Math.sign(temp) >= 0 ? '+' : '-'}${Math.round(temp)}`;
  }

  addWiOwm(code: any): any {
    return `wi-owm-${code}`;
  }
  //convertUnixTimestamp(timestamp:any): Date{
  //  return new Date(timestamp)
  //}
}
