import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitchComponent } from './theme-switch.component';
import {
  MatButtonModule,
  MatMenuModule
 } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule
  ],
  exports: [
    ThemeSwitchComponent
  ],
  declarations: [
    ThemeSwitchComponent
  ]
})
export class ThemeSwitchModule { }
