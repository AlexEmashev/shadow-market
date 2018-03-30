import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { AppRoutingModule } from '../app-routing.module';

/**
 * Module for routing in the app.
 */
@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    ContentComponent
  ],
  declarations: [ContentComponent]
})
export class ContentModule { }
