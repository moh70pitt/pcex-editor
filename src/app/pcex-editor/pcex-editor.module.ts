import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

import { PcexEditorRoutingModule } from './pcex-editor.routing';
import { PcexEditorComponent } from './pcex-editor.component';

@NgModule({
  declarations: [
    PcexEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
    PcexEditorRoutingModule
  ]
})
export class PcexEditorModule { }
