import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    MatCardModule,
    CommonModule
  ],
  exports: [
    AboutComponent
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
