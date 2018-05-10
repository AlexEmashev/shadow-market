import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { TranslateModule } from '@ngx-translate/core';
import { CatalogItemModule } from '../../components/catalog-item/catalog-item.module';
import { CatalogRoutingModule } from './catalog-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CatalogItemModule,
    CatalogRoutingModule
  ],
  declarations: [ CatalogComponent ],
  exports: [ CatalogComponent ],
  bootstrap: [],
  providers: []
})
export class CatalogModule { }
