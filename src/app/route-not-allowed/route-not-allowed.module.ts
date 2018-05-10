import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { RouteNotAllowedComponent } from './route-not-allowed.component';
import { RouteNotAllowedRoutingModule } from './route-not-allowed-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouteNotAllowedRoutingModule,
    TranslateModule
  ],
  declarations: [RouteNotAllowedComponent]
})
export class RouteNotAllowedModule { }
