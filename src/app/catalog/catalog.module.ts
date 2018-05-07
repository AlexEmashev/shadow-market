import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { CatalogItemComponent } from './catalog-item/catalog-item.component';
import { CatalogService } from './catalog.service';
import { MatCardModule } from '@angular/material/card';
import { Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatMenuModule, MatDialogModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MyItemsComponent } from './my-items/my-items.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { CatalogItemEditComponent } from './catalog-item-edit/catalog-item-edit.component';
import { ImagesEditComponent } from './images-edit/images-edit.component';
import { CatalogItemDetailsComponent } from './catalog-item-details/catalog-item-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { BuyDialogModule } from '../buy-dialog/buy-dialog.module';
import { AppRoutingModule } from '../app-routing.module';
import { UserLoginModule } from '../user-login/user-login.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    BuyDialogModule,
    AppRoutingModule,
    UserLoginModule
  ],
  declarations: [
    CatalogComponent,
    CatalogItemComponent,
    MyItemsComponent,
    DeleteConfirmationComponent,
    CatalogItemEditComponent,
    ImagesEditComponent,
    CatalogItemDetailsComponent],
  bootstrap: [DeleteConfirmationComponent],
  providers: [
    CatalogService // Will be created a single instance of the service and will be injected whernever required.
  ]
})
export class CatalogModule { }
