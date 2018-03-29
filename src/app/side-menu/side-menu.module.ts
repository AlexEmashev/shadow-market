import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule,
  MatButtonModule,
 } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenuComponent } from '../menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  exports: [
    MenuComponent
  ],
  declarations: [
    MenuComponent
  ]
})
export class SideMenuModule { }
