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
import { UserSettingsService } from '../../shared/user-settings.service';
import { LikeModule } from '../../components/like/like.module';
import { ViewsModule } from '../../components/views/views.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CatalogItemModule,
    CatalogRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    LikeModule,
    ViewsModule
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
        providers: [CatalogService, UserSettingsService]
      };
 }
}
