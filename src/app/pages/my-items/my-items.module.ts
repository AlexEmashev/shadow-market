import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CatalogItemModule } from '../../components/catalog-item/catalog-item.module';
import { MyItemsComponent } from './my-items.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { MyItemsRoutingModule } from './my-items-routing.module';
import { CatalogService } from '../../shared/catalog.service';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagesEditModule } from '../../components/images-edit/image-edit.module';
import { UserSettingsService } from '../../shared/user-settings.service';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CatalogItemModule,
    MyItemsRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    ImagesEditModule
  ],
  declarations: [ MyItemsComponent, ItemEditComponent ],
  exports: [ MyItemsComponent, ItemEditComponent ],
  bootstrap: [],
  providers: []
})
export class MyItemsModule {
  // Allowing access to the shared module of the root module
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CatalogItemModule,
      providers: [ CatalogService, UserSettingsService ]
    };
  }
}
