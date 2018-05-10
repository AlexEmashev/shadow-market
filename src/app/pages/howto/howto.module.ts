import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowToComponent } from './howto.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { HowToRoutingModule } from './howto-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    TranslateModule,
    HowToRoutingModule
  ],
  exports: [
    HowToComponent
  ],
  declarations: [HowToComponent]
})
export class HowToModule { }
