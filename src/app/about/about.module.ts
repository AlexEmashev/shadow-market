import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    MatCardModule,
    TranslateModule,
    CommonModule
  ],
  exports: [
    AboutComponent
  ],
  declarations: [AboutComponent]
})
export class AboutModule {
 }
