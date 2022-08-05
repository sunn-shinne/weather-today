import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-lang-toggle',
  templateUrl: './lang-toggle.component.html',
  styleUrls: ['./lang-toggle.component.scss'],
})
export class LangToggleComponent {
  supportLanguages = ['en', 'ru'];
  constructor(
    public translate: TranslateService,
    private locationService: LocationService
  ) {
    this.translate.addLangs(this.supportLanguages);
    const browserlang = this.translate.getDefaultLang();
    this.translate.use(browserlang);
  }

  onChangeLanguage(event: any) {
    this.translate.use(event.value);
    this.translate.currentLang = event.value;
    this.locationService
      .getCurrentLocation()
      .subscribe((place) => this.locationService.nextLocation(place));
  }
}
