import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { RouteNotAllowedComponent } from './route-not-allowed.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [RouteNotAllowedComponent]
})
export class RouteNotAllowedModule { }
