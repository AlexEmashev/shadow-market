import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CatalogItemComponent } from './catalog-item.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatDialogModule, MatCardModule } from '@angular/material';
import { CatalogService } from '../../shared/catalog.service';
import { BuyDialogModule } from '../buy-dialog/buy-dialog.module';
import { DeleteConfirmationModule } from '../delete-confirmation/delete-confirmation.module';
import { LikeModule } from '../like/like.module';
import { ViewsModule } from '../views/views.module';

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
    DeleteConfirmationModule,
    LikeModule,
    ViewsModule
  ],
  declarations: [ CatalogItemComponent ],
  exports: [ CatalogItemComponent ],
  bootstrap: [],
  providers: []
})
export class CatalogItemModule { }
