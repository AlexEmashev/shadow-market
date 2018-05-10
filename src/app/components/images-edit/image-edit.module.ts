import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ImagesEditComponent } from './images-edit.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
  ],
  declarations: [ ImagesEditComponent ],
  exports: [ ImagesEditComponent ],
  bootstrap: [],
  providers: []
})
export class CatalogItemModule {}
