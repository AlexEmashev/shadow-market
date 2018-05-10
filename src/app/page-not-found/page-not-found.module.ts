import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
import { TranslateModule } from '@ngx-translate/core';
import {PageNotFoundRoutingModule} from './page-not-found-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    PageNotFoundRoutingModule
  ],
  exports: [PageNotFoundComponent],
  declarations: [PageNotFoundComponent]
})
export class PageNotFoundModule { }
