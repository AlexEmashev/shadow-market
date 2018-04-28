import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitchComponent } from './theme-switch.component';
import {
  MatButtonModule,
  MatMenuModule
 } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    TranslateModule
  ],
  exports: [
    ThemeSwitchComponent
  ],
  declarations: [
    ThemeSwitchComponent
  ]
})
export class ThemeSwitchModule { }
