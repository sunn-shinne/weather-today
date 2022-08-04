import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, of, Subject, Subscription } from 'rxjs';
import { PlaceSuggestion } from '../../../interfaces/PlaceSuggestion';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-city-autocomplete',
  templateUrl: './city-autocomplete.component.html',
  styleUrls: ['./city-autocomplete.component.scss'],
})
export class CityAutocompleteComponent implements OnDestroy, OnInit {
  searchOptions = new Subject<PlaceSuggestion[] | null>();
  fieldFormControl = new FormControl<string>('');
  valueChangesSub: Subscription;
  choosenOption!: PlaceSuggestion;
  requestSub!: Subscription;

  constructor(private locationSerice: LocationService) {
    this.valueChangesSub = this.fieldFormControl.valueChanges.subscribe(
      (value) => {
        if (this.choosenOption && this.choosenOption.fullAddress === value) {
          this.searchOptions.next(null);
          return;
        }
        if (!value || value.length < 3) {
          this.searchOptions.next(null);
          return;
        }
        this.generateSuggestions(value);
      }
    );

    locationSerice.locationChange$.subscribe((place) => {
      this.fieldFormControl.patchValue(place.fullAddress);
    });
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        const cords = pos.coords;
        this.locationSerice
          .getPlaceByCords(cords.latitude, cords.longitude)
          .pipe(catchError(() => of(this.locationSerice.defaultPlace)))
          .subscribe((currentPlace) => {
            this.fieldFormControl.setValue(currentPlace.fullAddress);
            this.optionSelectionChange(currentPlace);
          });
      },
      (err) => {
        const defaultPlace = this.locationSerice.defaultPlace;
        this.fieldFormControl.setValue(defaultPlace.fullAddress);
        this.optionSelectionChange(defaultPlace);
      }
    );
  }

  ngOnDestroy() {
    this.valueChangesSub.unsubscribe();
  }

  generateSuggestions(text: string) {
    if (this.requestSub) {
      this.requestSub.unsubscribe();
    }

    this.requestSub = this.locationSerice.getPlaceSuggestions(text).subscribe(
      (data) => this.searchOptions.next(data.length ? data : null),
      (err) => console.log(err)
    );
  }

  optionSelectionChange(option: PlaceSuggestion) {
    this.choosenOption = option;
    this.locationSerice.nextLocation(option);
  }
}
