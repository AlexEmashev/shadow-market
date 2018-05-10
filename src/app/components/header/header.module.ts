import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
} from '@angular/material';
import { ThemeSwitchModule } from '../theme-switch/theme-switch.module';
import { UserLoginModule } from '../user-login/user-login.module';
import { RegisterDialogModule } from '../register-dialog/register-dialog.module';
import { LocaleSwitchModule } from '../locale-switch/locale-switch.module';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from '../../app-routing.module';

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
    ThemeSwitchModule,
    LocaleSwitchModule,
    UserLoginModule,
    RegisterDialogModule,
    AppRoutingModule
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
