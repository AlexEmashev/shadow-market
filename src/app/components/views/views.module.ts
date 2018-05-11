import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewsComponent } from './views.component';
import { MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule
  ],
  declarations: [ViewsComponent],
  exports: [ ViewsComponent ]
})
export class ViewsModule { }
