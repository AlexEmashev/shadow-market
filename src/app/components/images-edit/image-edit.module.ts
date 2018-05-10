import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ImagesEditComponent } from './images-edit.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule
  ],
  declarations: [ ImagesEditComponent ],
  exports: [ ImagesEditComponent ]
})
export class ImagesEditModule {}
