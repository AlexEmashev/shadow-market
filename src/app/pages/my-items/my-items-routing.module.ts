import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyItemsComponent } from './my-items.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { AuthGuardService } from '../../shared/auth-guard.service';
/**
 * List of available routes in the app.
 */
const routes: Routes = [
  { path: '', component: MyItemsComponent},
  { path: 'create', component: ItemEditComponent},
  { path: ':id', component: ItemEditComponent, canActivate: [AuthGuardService] },
];

/**
 * Main routing module in the app.
 */
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MyItemsRoutingModule {
  // Allowing access to the shared module of the root module
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MyItemsRoutingModule,
      providers: [AuthGuardService]
    };
 }
}
