// Import jQuery
import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

// NGX-Translate modules
import { TranslateModule, TranslateLoader, TranslateCompiler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

// Import application modules
import { ToolbarModule } from './components/header/header.module';
import { SidenavModule } from './components/side-nav/side-nav.module';
import { HeaderService } from './components/header/header.service';
import { AppRoutingModule } from './app-routing.module';
import { UserSettingsService } from './shared/user-settings.service';
import { AuthGuardService } from './shared/auth-guard.service';
import { ThemeService } from './shared/theme.service';
import { CatalogService } from './shared/catalog.service';
import { ThemeSwitchModule } from './components/theme-switch/theme-switch.module';
import { LocaleSwitchModule } from './components/locale-switch/locale-switch.module';
import { UserLoginModule } from './components/user-login/user-login.module';
import { ContentModule } from './components/content/content.module';

/**
 * Function for creating TranslateLoader.
 * Required for AOT compilation.
 * @param http inject http service.
 */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/locales/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToolbarModule,
    ThemeSwitchModule,
    SidenavModule,
    UserLoginModule,
    ContentModule,
    AppRoutingModule,
    LocaleSwitchModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    })
  ],
  providers: [
    HeaderService,
    UserSettingsService,
    AuthGuardService,
    ThemeService,
    CatalogService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
