import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  changeLogo(): any {
    let time = new Date().getHours();
    switch (true) {
      case (time >= 4 && time < 12):
        return 'morning'
      case (time >= 12 && time < 20):
        return 'afternoon'
      case (time >= 20 || time < 4):
        return 'night'
      default:
    }
  }
}
