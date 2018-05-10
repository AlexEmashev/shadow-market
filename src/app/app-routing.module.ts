import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogItemDetailsComponent } from './catalog/catalog-item-details/catalog-item-details.component';
import { MyItemsComponent } from './catalog/my-items/my-items.component';
import { CatalogItemEditComponent } from './catalog/catalog-item-edit/catalog-item-edit.component';
import { AboutComponent } from './about/about.component';
import { HowToComponent } from './howto/howto.component';
import { AuthGuardService } from './auth-guard.service';
/**
 * List of available routes in the app.
 */
const routes: Routes = [
  { path: '', redirectTo: 'catalog', pathMatch: 'full'},
  { path: 'catalog', component: CatalogComponent },
  { path: 'catalog/:id', component: CatalogItemDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'my-items', component: MyItemsComponent },
  { path: 'my-items/create', component: CatalogItemEditComponent},
  { path: 'my-items/:id', component: CatalogItemEditComponent, canActivate: [AuthGuardService] },
  { path: 'howto', component: HowToComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'not-allowed', loadChildren: './route-not-allowed/route-not-allowed.module#RouteNotAllowedModule' },
  { path: '404', loadChildren: './page-not-found/page-not-found.module#PageNotFoundModule' },
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
