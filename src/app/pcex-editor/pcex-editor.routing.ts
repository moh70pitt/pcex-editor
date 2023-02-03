import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PcexEditorComponent } from './pcex-editor.component';

const routes: Routes = [
  { path: '', component: PcexEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PcexEditorRoutingModule { }
