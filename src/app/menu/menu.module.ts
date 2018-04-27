import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule,
  MatButtonModule,
  MatMenuModule
 } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MenuComponent } from './menu.component';
import { ContentModule } from '../content/content.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    BrowserAnimationsModule,
    ContentModule,
    AppRoutingModule
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
