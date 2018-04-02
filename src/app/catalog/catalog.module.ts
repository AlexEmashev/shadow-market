import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { CatalogService } from './catalog.service';
import { MatCardModule } from '@angular/material/card';
import { Http } from '@angular/http';
import { MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [CatalogComponent],
  providers: [
    CatalogService // Will be created a single instance of the service and will be injected whernever required.
  ]
})
export class CatalogModule { }
