import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MonacoEditorModule } from 'ngx-monaco-editor';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

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
    PcexEditorRoutingModule,
    InputTextModule, InputTextareaModule,
    ButtonModule, CheckboxModule,
  ]
})
export class PcexEditorModule { }
