import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { CityAutocompleteComponent } from './core/components/autocomplete/city-autocomplete.component';
import { LangToggleComponent } from './core/components/lang-toggle/lang-toggle.component';
import { NavsComponent } from './core/components/navs/navs.component';

import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SwiperModule } from 'swiper/angular';
import { FooterComponent } from './core/footer/footer.component';

import { CommonModule, registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SixteenDaysWeatherModule } from './pages/sixteen-days-weather/sixteen-days-weather.module';
import { SharedModule } from './shared/shared.module';
import { TodayWeatherModule } from './pages/today-weather/today-weather.module';
import { WeatherChartsModule } from './pages/weather-charts/weather-charts.module';

registerLocaleData(localeRu);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CityAutocompleteComponent,
    LangToggleComponent,
    NavsComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SixteenDaysWeatherModule,
    TodayWeatherModule,
    WeatherChartsModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SwiperModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  exports: [TranslateModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
  }
}
