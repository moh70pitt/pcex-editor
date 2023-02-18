import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MonacoEditorModule } from 'ngx-monaco-editor';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

import { EditorRoutingModule } from './editor.routing';
import { EditorComponent } from './editor.component';

@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
    EditorRoutingModule,
    InputTextModule, InputTextareaModule,
    ButtonModule, CheckboxModule,
  ]
})
export class EditorModule { }
