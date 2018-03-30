import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcesComponent } from './resources.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ResourcesComponent
  ],
  declarations: [ResourcesComponent]
})
export class ResourcesModule { }
