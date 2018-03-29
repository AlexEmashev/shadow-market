import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule,
  MatButtonModule,
  MatMenuModule
 } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenuComponent } from './menu.component';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    BrowserAnimationsModule
  ],
  exports: [
    MenuComponent
  ],
  providers: [

  ],
  declarations: [
    MenuComponent
  ]
})
export class MainSidenavModule { }
