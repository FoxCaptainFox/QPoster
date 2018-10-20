import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MatTabsModule } from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { StartPageModule } from './layouts/start-page/start-page.module';
import { RouterModule } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { AboutComponent } from './layouts/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    StartPageModule,
    RouterModule.forRoot([]),
  ],
  exports: [
    MainComponent
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
