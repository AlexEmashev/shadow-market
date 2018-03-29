import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import application modules
import { ToolbarModule } from './toolbar/toolbar.module';
import { SideMenuModule } from './side-menu/side-menu.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ToolbarModule,
    SideMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
