import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { NotAllowedComponent } from './not-allowed.component';
import { NotAllowedRoutingModule } from './not-allowed-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    NotAllowedRoutingModule,
    TranslateModule
  ],
  declarations: [NotAllowedComponent]
})
export class NotAllowedModule { }
