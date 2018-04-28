import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatMenuModule
 } from '@angular/material';
import { LocaleSwitchComponent } from './locale-switch.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    TranslateModule,
  ],
  exports: [
    LocaleSwitchComponent
  ],
  declarations: [
    LocaleSwitchComponent
  ]
})
export class LocaleSwitchModule { }
