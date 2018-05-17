import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { AuthGuardService } from '../../shared/auth-guard.service';

/**
 * List of available routes in the app.
 */
const routes: Routes = [
  { path: '', component: CatalogComponent},
  { path: ':id', component: ItemDetailsComponent}
];

/**
 * Main routing module in the app.
 */
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CatalogRoutingModule {
  // Allowing access to the shared module of the root module
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CatalogRoutingModule,
      providers: [AuthGuardService]
    };
  }
 }
