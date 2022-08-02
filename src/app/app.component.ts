import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'weather-today';
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
  }

  changeBackgroundColor(): any {
    let time = new Date().getHours();
    switch (true) {
      case (time >= 4 && time < 12):
        this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = 'var(--morning)';
        this.elementRef.nativeElement.ownerDocument
          .body.style.background = 'linear-gradient(180deg, rgba(252,221,240,1) 0%, rgba(212,197,255,1) 66%, rgba(125,182,255,1) 100%)';
        break;
      case (time >= 12 && time < 20):
        this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = 'var(--afternoon)';
        this.elementRef.nativeElement.ownerDocument
          .body.style.background = 'linear-gradient(180deg, rgba(187,211,248,1) 41%, rgba(255,225,165,1) 85%, rgba(255,223,153,1) 100%)';
        break;
      case (time >= 20 || time < 4):
        this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = 'var(--night)';
        this.elementRef.nativeElement.ownerDocument
          .body.style.background = 'linear-gradient(180deg, rgba(186,189,255,1) 12%, rgba(175,170,236,1) 70%, rgba(132,105,172,1) 100%)';
        break;
      default:
        this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = 'var(--morning)';
        this.elementRef.nativeElement.ownerDocument
          .body.style.background = 'linear-gradient(180deg, rgba(252,221,240,1) 0%, rgba(212,197,255,1) 66%, rgba(125,182,255,1) 100%)';
    }
  }
}
