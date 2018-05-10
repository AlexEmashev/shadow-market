import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteNotAllowedComponent } from './route-not-allowed.component';
/**
 * List of available routes in the app.
 */
const routes: Routes = [
  { path: '', component: RouteNotAllowedComponent},
];

/**
 * Main routing module in the app.
 */
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RouteNotAllowedRoutingModule { }
