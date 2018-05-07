import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule
 } from '@angular/material';
 import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterDialogComponent } from './register-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    TranslateModule
  ],
  exports: [RegisterDialogComponent],
  declarations: [RegisterDialogComponent],
  bootstrap: [RegisterDialogComponent]
})
export class RegisterDialogModule { }
