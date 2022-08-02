import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlaceSuggestion } from '../interfaces/PlaceSuggestion';

interface GeocodingFeatureProperties {
  country: string;
  state: string;
  city: string;
  lon: number;
  lat: number;
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locationChange$ = new ReplaySubject<PlaceSuggestion>(1);
  currentLocation!: PlaceSuggestion;
  defaultPlace: PlaceSuggestion = {
    city: 'Moscow',
    fullAddress: 'Moscow, Russia',
    cords: {
      lat: 55.751244,
      lon: 37.618423,
    },
  };

  constructor(private http: HttpClient, private translate: TranslateService) {}

  nextLocation(place: PlaceSuggestion) {
    this.currentLocation = place;
    this.locationChange$.next(place);
  }

  getCurrentLocation() {
    return this.getPlaceByCords(
      this.currentLocation.cords.lat,
      this.currentLocation.cords.lon
    );
  }

  getPlaceByCords(latitude: number, longitude: number) {
    //const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=${this.translate.currentLang}&limit=1&type=city&apiKey=${environment.geoapify.API_key}`;
    return this.http
      .get('https://api.geoapify.com/v1/geocode/reverse', {
        params: {
          lat: latitude,
          lon: longitude,
          lang: this.translate.currentLang,
          limit: '1',
          type: 'city',
          apiKey: environment.geoapify.API_key,
        },
      })
      .pipe(
        map((data: any) => this.generatePlaceItem(data.features[0].properties))
      );
  }

  getPlaceSuggestions(text: string) {
    //const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&lang=${this.translate.currentLang}&limit=10&type=city&apiKey=${environment.geoapify.API_key}`;
    return this.http
      .get('https://api.geoapify.com/v1/geocode/autocomplete', {
        params: {
          text: text,
          lang: this.translate.currentLang,
          limit: '10',
          type: 'city',
          apiKey: environment.geoapify.API_key,
        },
      })
      .pipe(
        map((data: any) => {
          const { features } = data;
          const placeSuggestions = features
            .map(
              (item: { properties: GeocodingFeatureProperties }) =>
                item.properties
            )
            .filter((properties: GeocodingFeatureProperties) => properties.city)
            .map((properties: GeocodingFeatureProperties) =>
              this.generatePlaceItem(properties)
            );
          return placeSuggestions;
        })
      );
  }

  generatePlaceItem(properties: GeocodingFeatureProperties): PlaceSuggestion {
    const place: PlaceSuggestion = {} as PlaceSuggestion;
    place.city = properties.city;
    place.cords = { lat: properties.lat, lon: properties.lon };

    if (properties.city !== properties.state && properties.state) {
      place.fullAddress = `${properties.city}, ${properties.state}, ${properties.country}`;
    } else {
      place.fullAddress = `${properties.city}, ${properties.country}`;
    }

    return place;
  }
}
