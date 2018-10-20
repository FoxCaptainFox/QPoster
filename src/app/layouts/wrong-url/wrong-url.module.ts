import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TransactionService } from 'src/app/services/http/transaction.service';
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
  ],
  providers: [
    TransactionService
  ]
})
export class StartPageModule { }
