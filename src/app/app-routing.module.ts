import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuardService } from './shared/auth-guard.service';
/**
 * List of available routes in the app.
 */
const routes: Routes = [
  { path: '', redirectTo: 'catalog', pathMatch: 'full'},
  { path: 'catalog', loadChildren: './pages/catalog/catalog.module#CatalogModule' },
  // { path: 'catalog/:id', component: CatalogItemDetailsComponent, canActivate: [AuthGuardService] },
  // { path: 'my-items', component: MyItemsComponent },
  // { path: 'my-items/create', component: CatalogItemEditComponent},
  // { path: 'my-items/:id', component: CatalogItemEditComponent, canActivate: [AuthGuardService] },
  { path: 'settings', component: SettingsComponent },
  { path: 'howto', loadChildren: './pages/howto/howto.module#HowToModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutModule' },
  { path: 'not-allowed', loadChildren: './pages/not-allowed/not-allowed.module#NotAllowedModule' },
  { path: '404', loadChildren: './pages/page-not-found/page-not-found.module#PageNotFoundModule' },
  { path: '**', redirectTo: '404' }
];

/**
 * Main routing module in the app.
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
