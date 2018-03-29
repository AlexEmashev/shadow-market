import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import application modules
import { ToolbarModule } from './toolbar/toolbar.module';
import { MainSidenavModule } from './menu/menu.module';
import { ToolbarService } from './toolbar/toolbar.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ToolbarModule,
    MainSidenavModule
  ],
  providers: [
    ToolbarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
