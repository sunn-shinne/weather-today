import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CityAutocompleteComponent } from './autocomplete/city-autocomplete.component';
import { LangToggleComponent } from './lang-toggle/lang-toggle.component';
import { NavsComponent } from './navs/navs.component';
import { TodayWeatherComponent } from './today-weather/today-weather.component';
import { TomorrowWeatherComponent } from './tomorrow-weather/tomorrow-weather.component';
import { SevenDaysWeatherComponent } from './seven-days-weather/seven-days-weather.component';
import { SixteenDaysWeatherComponent } from './sixteen-days-weather/sixteen-days-weather.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CityAutocompleteComponent,
    LangToggleComponent,
    NavsComponent,
    TodayWeatherComponent,
    TomorrowWeatherComponent,
    SevenDaysWeatherComponent,
    SixteenDaysWeatherComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
