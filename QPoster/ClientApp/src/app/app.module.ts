import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';

import { AppComponent } from './app.component';
import { StartPageModule } from './layouts/start-page/start-page.module';
import { RouterModule } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { AboutComponent } from './layouts/about/about.component';
import { CategoriesComponent } from './layouts/categories/categories.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { MenuService } from './services/menu.service';
import { CookieService } from 'ngx-cookie-service';
import { CategoriesService } from './services/local/categories.service';
import { CheckComponent } from './layouts/check/check.component';
import { EndDialogComponent } from './components/end-dialog/end-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutComponent,
    CategoriesComponent,
    CategoryComponent,
    ProductComponent,
    CheckComponent,
    EndDialogComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatExpansionModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    StartPageModule,
    MatDialogModule,
    RouterModule.forRoot([]),
  ],
  exports: [
    MainComponent
  ],
  providers: [
    HttpClient,
    MenuService,
    CookieService,
    CategoriesService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EndDialogComponent
  ]
})
export class AppModule { }
