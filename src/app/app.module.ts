// Import jQuery
import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import application modules
import { ToolbarModule } from './toolbar/toolbar.module';
import { MainSidenavModule } from './menu/menu.module';
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
import { ResourcesModule } from './resources/resources.module';
import { AboutModule } from './about/about.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { RouteNotAllowedModule } from './route-not-allowed/route-not-allowed.module';
/**
 * Module of main routing container.
 */
import { ContentModule } from './content/content.module';
import { ThemeSwitchModule } from './theme-switch/theme-switch.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToolbarModule,
    ThemeSwitchModule,
    MainSidenavModule,
    ContentModule,
    SettingsModule,
    CatalogModule,
    DashboardModule,
    ResourcesModule,
    AboutModule,
    AppRoutingModule,
    PageNotFoundModule,
    RouteNotAllowedModule
  ],
  providers: [
    ToolbarService,
    UserSettingsService,
    AuthGuardService,
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
