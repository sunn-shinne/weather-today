import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '[class.theme-morning]': 'hours >= 4 && hours < 12',
    '[class.theme-afternoon]': 'hours >= 12 && hours < 20',
    '[class.theme-night]': 'hours >= 20 || hours < 4',
  },
})
export class AppComponent {
  title = 'weather-today';
  hours = new Date().getHours();
}
