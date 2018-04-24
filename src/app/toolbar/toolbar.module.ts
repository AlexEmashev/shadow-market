import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule,
        MatButtonModule,
        MatIconModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeSwitchModule } from '../theme-switch/theme-switch.module';

import { HeaderComponent } from './header.component';

/**
* Main app Toolbar.
*/
@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    ThemeSwitchModule
  ],
  // Export components, so they be available for other components to use
  exports: [
    HeaderComponent
  ],
  declarations: [
    // Component of title of the page
    HeaderComponent]
})
export class ToolbarModule { }
