import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
/**
 * List of available routes in the app.
 */
const routes: Routes = [
  { path: '', component: PageNotFoundComponent},
];

/**
 * Main routing module in the app.
 */
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PageNotFoundRoutingModule { }
