import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule,
  MatButtonModule,
  MatMenuModule
 } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { SidenavComponent } from './side-nav.component';
import { ContentModule } from '../content/content.module';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    ContentModule,
    AppRoutingModule
  ],
  exports: [
    SidenavComponent
  ],
  providers: [

  ],
  declarations: [
    SidenavComponent
  ]
})
export class SidenavModule { }
