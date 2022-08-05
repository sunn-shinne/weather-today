import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  chooseLogoPath(): string {
    const hours = new Date().getHours();
    let themeName;
    if (hours >= 4 && hours < 12) {
      themeName = 'morning';
    } else if (hours >= 12 && hours < 20) {
      themeName = 'afternoon';
    } else {
      themeName = 'night';
    }
    return `../../assets/icons/logo/${themeName}.svg`;
  }
}
