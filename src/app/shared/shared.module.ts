import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { SwiperModule } from 'swiper/angular';

import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { LocalizedDatePipe } from '../pipes/localized-date.pipe';

import { ErrorMessageComponent } from './error-message/error-message.component';
import { SpinnerComponent } from './spinner/spinner.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';




@NgModule({
  declarations: [
    CapitalizePipe,
    LocalizedDatePipe,
    SpinnerComponent,
    ErrorMessageComponent
  ],
  imports: [
    FormsModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatTableModule,
    SwiperModule,
    LeafletModule,
    TranslateModule,
  ],
  exports:[
    SpinnerComponent,
    ErrorMessageComponent,
    MatTableModule,
    SwiperModule,
    CapitalizePipe,
    LocalizedDatePipe,
    LeafletModule,
    CommonModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    FormsModule,
  ]
})
export class SharedModule { }
