import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyDialogComponent } from './buy-dialog.component';
import {
  MatButtonModule,
  MatDialogModule,
 } from '@angular/material';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    TranslateModule
  ],
  declarations: [BuyDialogComponent],
  bootstrap: [BuyDialogComponent]
})
export class BuyDialogModule { }
