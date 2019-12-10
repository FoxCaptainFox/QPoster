import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WrongUrlComponent } from './wrong-url.component';

@NgModule({
  declarations: [
    WrongUrlComponent
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    WrongUrlComponent,
  ]
})
export class WrongUrlModel { }
