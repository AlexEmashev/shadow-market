import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CatalogItemComponent } from './catalog-item.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
  ],
  declarations: [ CatalogItemComponent ],
  exports: [ CatalogItemComponent ],
  bootstrap: [],
  providers: []
})
export class CatalogItemModule { }
