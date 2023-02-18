import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'editor', loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule) },
  { path: 'sources', loadChildren: () => import('./sources/sources.module').then(m => m.SourcesModule) },
  { path: 'activities', loadChildren: () => import('./activities/activities.module').then(m => m.ActivitiesModule) },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
