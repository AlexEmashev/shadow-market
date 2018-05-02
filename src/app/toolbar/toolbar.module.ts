import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeSwitchModule } from '../theme-switch/theme-switch.module';
import { UserLoginModule } from '../user-login/user-login.module';
import { LocaleSwitchModule } from '../locale-switch/locale-switch.module';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './header.component';


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
    MatMenuModule,
    BrowserAnimationsModule,
    ThemeSwitchModule,
    LocaleSwitchModule,
    UserLoginModule
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
