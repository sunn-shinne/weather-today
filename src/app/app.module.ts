import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { CityAutocompleteComponent } from './core/components/autocomplete/city-autocomplete.component';
import { LangToggleComponent } from './core/components/lang-toggle/lang-toggle.component';
import { NavsComponent } from './core/components/navs/navs.component';
import { TodayWeatherComponent } from './pages/today-weather/today-weather/today-weather.component';
import { WeatherСhartsComponent } from './pages/weather-charts/weather-charts/weather-charts.component';
import { SixteenDaysWeatherComponent } from './pages/sixteen-days-weather/sixteen-days-weather/sixteen-days-weather.component';
import { RightNowWeatherComponent } from './weather/right-now-weather/right-now-weather.component';

import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SunriseWeatherComponent } from './weather/sunrise-weather/sunrise-weather.component';
import { HourlyForecastComponent } from './weather/hourly-forecast/hourly-forecast.component';
import { SwiperModule } from 'swiper/angular';
import { SpinnerComponent } from './core/spinner/spinner.component';
import { FooterComponent } from './core/footer/footer.component';
import { DailyStepForecastComponent } from './weather/daily-step-forecast/daily-step-forecast.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { WeatherMapComponent } from './weather/weather-map/weather-map.component';

import { LocalizedDatePipe } from './pipes/localized-date.pipe';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { AirPollutionComponent } from './pages/weather-charts/charts/air-pollution/air-pollution.component';
import { AmountOfPrecipitationComponent } from './pages/weather-charts/charts/amount-of-precipitation/amount-of-precipitation.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AverageTemperatureComponent } from './pages/weather-charts/charts/average-temperature/average-temperature.component';
import { HumidityComponent } from './pages/weather-charts/charts/humidity/humidity.component';
import { ErrorMessageComponent } from './core/error-message/error-message.component';

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
    TodayWeatherComponent,
    WeatherСhartsComponent,
    RightNowWeatherComponent,
    SixteenDaysWeatherComponent,
    SunriseWeatherComponent,
    HourlyForecastComponent,
    SpinnerComponent,
    FooterComponent,
    DailyStepForecastComponent,
    CapitalizePipe,
    LocalizedDatePipe,
    AirPollutionComponent,
    WeatherMapComponent,
    AmountOfPrecipitationComponent,
    AverageTemperatureComponent,
    HumidityComponent,
    ErrorMessageComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatTableModule,
    HttpClientModule,
    SwiperModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    LeafletModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
  }
}
