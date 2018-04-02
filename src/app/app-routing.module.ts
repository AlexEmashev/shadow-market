import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AboutComponent } from './about/about.component';
import { ResourcesComponent } from './resources/resources.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
/**
 * List of available routes in the app.
 */
const routes: Routes = [
  { path: '', redirectTo: '/catalog', pathMatch: 'full'},
  { path: 'catalog', component: CatalogComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'settings', component: SettingsComponent},
  { path: 'about', component: AboutComponent },
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
