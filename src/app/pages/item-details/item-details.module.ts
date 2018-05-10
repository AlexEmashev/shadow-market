import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemDetailsComponent } from './item-details.component';
import { CatalogService } from '../../shared/catalog.service';
import { MatCardModule } from '@angular/material/card';
import { Http } from '@angular/http';
import { MatButtonModule, MatIconModule, MatMenuModule, MatDialogModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { BuyDialogModule } from '../../buy-dialog/buy-dialog.module';
import { AppRoutingModule } from '../../app-routing.module';
import { UserLoginModule } from '../../user-login/user-login.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BuyDialogModule,
    AppRoutingModule,
    UserLoginModule
  ],
  declarations: [
    ItemDetailsComponent],
})
export class CatalogModule { }
