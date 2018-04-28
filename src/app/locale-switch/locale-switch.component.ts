import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-locale-switch',
  templateUrl: './locale-switch.component.html',
  styleUrls: ['./locale-switch.component.scss']
})
export class LocaleSwitchComponent implements OnInit {

  constructor( private translate: TranslateService) { }

  ngOnInit() {
  }

  switchLocale(locale: string) {
    this.translate.use(locale);
  }

}
