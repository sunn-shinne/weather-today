import { Component } from '@angular/core';

@Component({
  selector: 'app-lang-toggle',
  templateUrl: './lang-toggle.component.html',
  styleUrls: ['./lang-toggle.component.scss'],
})
export class LangToggleComponent {
  language: 'ru' | 'en' = 'en';

  constructor() {}

  onChangeLanguage(event: any) {
    this.language = event.value;
  }
}
