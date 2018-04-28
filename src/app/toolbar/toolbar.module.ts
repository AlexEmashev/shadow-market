import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule,
        MatButtonModule,
        MatIconModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeSwitchModule } from '../theme-switch/theme-switch.module';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './header.component';
import { LocaleSwitchModule } from '../locale-switch/locale-switch.module';


/**
* Main app Toolbar.
*/
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    ThemeSwitchModule,
    LocaleSwitchModule
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
