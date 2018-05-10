import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { TranslateModule } from '@ngx-translate/core';
import { CatalogItemModule } from '../../components/catalog-item/catalog-item.module';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { MatButtonModule, MatIconModule, MatDialogModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { CatalogService } from '../../shared/catalog.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CatalogItemModule,
    CatalogRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  declarations: [ CatalogComponent, ItemDetailsComponent ],
  exports: [ CatalogComponent, ItemDetailsComponent ],
  bootstrap: [],
  providers: []
})
export class CatalogModule {
    // Allowing access to the shared module of the root module
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: CatalogRoutingModule,
        providers: [CatalogService]
      };
 }
}
