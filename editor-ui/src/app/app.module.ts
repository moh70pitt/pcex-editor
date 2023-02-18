import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { SourcesService } from './sources.service';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SourcesComponent } from './sources/sources.component';
import { ActivitiesComponent } from './activities/activities.component';
import { EditorComponent } from './editor/editor.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SourcesComponent,
    ActivitiesComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    CommonModule,
    ButtonModule,
    AccordionModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    HttpClientModule,
    RouterModule,
    CheckboxModule,
  ],
  providers: [SourcesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
