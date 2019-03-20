import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

// Import ngrx Redux modules
import { StoreModule } from '@ngrx/store';

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
import { ContentModule } from './components/content/content.module';
import { LocaleService } from './shared/locale.service';
import { DBService } from './shared/db.service';
// Import User Settings state modules
import {reducers, metaRducers} from './shared/reducers/reducers';

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
    SidenavModule,
    ContentModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
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
    LocaleService,
    CatalogService,
    DBService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
