import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-toggle',
  templateUrl: './lang-toggle.component.html',
  styleUrls: ['./lang-toggle.component.scss'],
})
export class LangToggleComponent {
  supportLanguages = ['en', 'ru']
  constructor(public translate: TranslateService) {
    this.translate.addLangs(this.supportLanguages);
    const browserlang = this.translate.getDefaultLang();
    this.translate.use(browserlang)
  }

  onChangeLanguage(event: any) {
    this.translate.use(event.value);
  }
}
