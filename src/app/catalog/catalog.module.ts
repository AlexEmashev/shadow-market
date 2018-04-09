import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { CatalogItemComponent } from './catalog-item/catalog-item.component';
import { CatalogService } from './catalog.service';
import { MatCardModule } from '@angular/material/card';
import { Http } from '@angular/http';
import { MatButtonModule, MatIconModule, MatMenuModule, MatDialogModule } from '@angular/material';
import { MyItemsComponent } from './my-items/my-items.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { CatalogItemEditComponent } from './catalog-item-edit/catalog-item-edit.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule
  ],
  declarations: [
    CatalogComponent,
    CatalogItemComponent,
    MyItemsComponent,
    DeleteConfirmationComponent,
    CatalogItemEditComponent],
  bootstrap: [DeleteConfirmationComponent],
  providers: [
    CatalogService // Will be created a single instance of the service and will be injected whernever required.
  ]
})
export class CatalogModule { }
