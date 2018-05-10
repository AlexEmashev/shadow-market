import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login.component';
import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule
 } from '@angular/material';
 import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    TranslateModule
  ],
  exports: [UserLoginComponent],
  declarations: [UserLoginComponent],
  bootstrap: [UserLoginComponent]
})
export class UserLoginModule {

 }
