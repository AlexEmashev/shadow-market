import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { RouteNotAllowedComponent } from './route-not-allowed.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ],
  declarations: [RouteNotAllowedComponent]
})
export class RouteNotAllowedModule { }
