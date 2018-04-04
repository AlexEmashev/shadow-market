import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import application modules
import { ToolbarModule } from './toolbar/toolbar.module';
import { MainSidenavModule } from './menu/menu.module';
import { ToolbarService } from './toolbar/toolbar.service';
import { AppRoutingModule } from './app-routing.module';
import { UserSettingsService } from './user-settings.service';
/**
 * App pages
 */
import { CatalogModule } from './catalog/catalog.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SettingsModule } from './settings/settings.module';
import { ResourcesModule } from './resources/resources.module';
import { AboutModule } from './about/about.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
/**
 * Module of main routing container.
 */
import { ContentModule } from './content/content.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ToolbarModule,
    MainSidenavModule,
    ContentModule,
    SettingsModule,
    CatalogModule,
    DashboardModule,
    ResourcesModule,
    AboutModule,
    AppRoutingModule,
    PageNotFoundModule
  ],
  providers: [
    ToolbarService,
    UserSettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
