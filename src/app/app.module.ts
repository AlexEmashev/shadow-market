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
import { ToolbarModule } from './toolbar/toolbar.module';
import { SidenavModule } from './side-nav/side-nav.module';
import { ToolbarService } from './toolbar/toolbar.service';
import { AppRoutingModule } from './app-routing.module';
import { UserSettingsService } from './user-settings.service';
import { AuthGuardService } from './auth-guard.service';
import { ThemeService } from './theme.service';
/**
 * App pages
 */
import { CatalogModule } from './catalog/catalog.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SettingsModule } from './settings/settings.module';
import { HowToModule } from './howto/howto.module';
import { AboutModule } from './about/about.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { RouteNotAllowedModule } from './route-not-allowed/route-not-allowed.module';
/**
 * Module of main routing container.
 */
import { ContentModule } from './content/content.module';
import { ThemeSwitchModule } from './theme-switch/theme-switch.module';
import { LocaleSwitchModule } from './locale-switch/locale-switch.module';
import { UserLoginModule } from './user-login/user-login.module';

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
    ToolbarModule,
    ThemeSwitchModule,
    SidenavModule,
    UserLoginModule,
    ContentModule,
    SettingsModule,
    CatalogModule,
    DashboardModule,
    HowToModule,
    AboutModule,
    AppRoutingModule,
    PageNotFoundModule,
    RouteNotAllowedModule,
    HttpClientModule,
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
    ToolbarService,
    UserSettingsService,
    AuthGuardService,
    ThemeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
