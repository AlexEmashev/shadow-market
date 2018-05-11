import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CatalogItemComponent } from './catalog-item.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatDialogModule, MatCardModule } from '@angular/material';
import { CatalogService } from '../../shared/catalog.service';
import { BuyDialogModule } from '../buy-dialog/buy-dialog.module';
import { DeleteConfirmationModule } from '../delete-confirmation/delete-confirmation.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule,
    BuyDialogModule,
    DeleteConfirmationModule
  ],
  declarations: [ CatalogItemComponent ],
  exports: [ CatalogItemComponent ],
  bootstrap: [],
  providers: []
})
export class CatalogItemModule {
  // Allowing access to the shared module of the root module
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CatalogItemModule,
      providers: [CatalogService]
    };
  }
 }
