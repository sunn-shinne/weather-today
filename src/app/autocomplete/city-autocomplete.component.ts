import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-city-autocomplete',
  templateUrl: './city-autocomplete.component.html',
  styleUrls: ['./city-autocomplete.component.scss'],
})
export class CityAutocompleteComponent implements OnInit {
  cityControl = new FormControl('');
  cities: string[] = ['Bryansk', 'Izevsk', 'Moscow'];
  filteredCities!: Observable<string[]>;

  ngOnInit() {
    this.filteredCities = this.cityControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.cities.filter((city) =>
      this._normalizeValue(city).includes(filterValue)
    );
  }

  _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
