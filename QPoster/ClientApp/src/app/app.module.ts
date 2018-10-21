import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';

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

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutComponent,
    CategoriesComponent,
    CategoryComponent,
    ProductComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatExpansionModule,
    HttpClientModule,
    MatButtonModule,
    StartPageModule,
    RouterModule.forRoot([]),
  ],
  exports: [
    MainComponent
  ],
  providers: [
    HttpClient,
    MenuService,
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
