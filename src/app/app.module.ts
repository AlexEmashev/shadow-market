import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import material style.
import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

// Import application modules
import { ToolbarModule } from './toolbar/toolbar.module';
import { SideMenuModule } from './side-menu/side-menu.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    BrowserModule,
    ToolbarModule,
    SideMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
