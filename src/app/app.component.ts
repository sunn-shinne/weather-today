import { Component, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
      case (time >= 6 && time < 12):
        this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = 'var(--morning)';
        this.elementRef.nativeElement.ownerDocument
          .body.style.background = 'linear-gradient(180deg, r rgba(252,221,240,1) 0%, rgba(212,197,255,1) 66%, rgba(125,182,255,1) 100%)';
        break;
      case (time >= 12 && time < 18):
        this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = 'var(--afternoon)';
        this.elementRef.nativeElement.ownerDocument
          .body.style.background = 'linear-gradient(180deg, rgba(187,211,248,1) 25%, rgba(255,225,165,1) 81%, rgba(255,227,125,1) 100%)';
        break;
      case (time >= 18):
        this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = 'var(--evening)';
        this.elementRef.nativeElement.ownerDocument
          .body.style.background = 'linear-gradient(180deg, rgba(255,183,135,1) 30%, rgba(255,150,109,1) 65%, rgba(255,105,113,1) 100%)';
        break;
      case (time >= 0 && time < 6):
        this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = 'var(--night)';
        this.elementRef.nativeElement.ownerDocument
          .body.style.background = 'linear-gradient(180deg, rgba(153,158,255,1) 0%, rgba(140,134,210,1) 47%, rgba(139,105,172,1) 100%)';
        break;
      default:
        this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = 'var(--morning)';
        this.elementRef.nativeElement.ownerDocument
          .body.style.background = 'linear-gradient(180deg, r rgba(252,221,240,1) 0%, rgba(212,197,255,1) 66%, rgba(125,182,255,1) 100%)';
    }
  }
}
