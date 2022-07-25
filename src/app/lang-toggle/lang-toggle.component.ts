import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-toggle',
  templateUrl: './lang-toggle.component.html',
  styleUrls: ['./lang-toggle.component.scss'],
})
export class LangToggleComponent {
  language: 'ru' | 'en' = 'en';

  constructor(public translate: TranslateService){
  }

  onChangeLanguage(event: any) {
    this.language = event.value;
  }
}
