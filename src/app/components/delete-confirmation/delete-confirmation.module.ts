import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [ DeleteConfirmationComponent ],
  exports: [ DeleteConfirmationComponent ],
  bootstrap: [DeleteConfirmationComponent]
})
export class DeleteConfirmationModule {
 }
