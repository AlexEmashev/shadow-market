import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CatalogComponent } from './catalog/catalog.component';
import { MyItemsComponent } from './catalog/my-items/my-items.component';
import { CatalogItemEditComponent } from './catalog/catalog-item-edit/catalog-item-edit.component';
import { AboutComponent } from './about/about.component';
import { ResourcesComponent } from './resources/resources.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouteNotAllowedComponent } from './route-not-allowed/route-not-allowed.component';
import { AuthGuardService } from './auth-guard.service';
/**
 * List of available routes in the app.
 */
const routes: Routes = [
  { path: '', redirectTo: '/catalog', pathMatch: 'full'},
  { path: 'catalog', component: CatalogComponent },
  { path: 'my-items', component: MyItemsComponent },
  { path: 'my-items/create', component: CatalogItemEditComponent},
  { path: 'my-items/:id', component: CatalogItemEditComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'settings', component: SettingsComponent},
  { path: 'about', component: AboutComponent },
  { path: 'not-allowed', component: RouteNotAllowedComponent },
  { path: '**', component: PageNotFoundComponent }
]

/**
 * Main routing module in the app.
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
