import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StartPageComponent } from './start-page.component';
import { TransactionService } from 'src/app/services/http/transaction.service';
import { WrongUrlComponent } from '../wrong-url/wrong-url.component';

@NgModule({
  declarations: [
    StartPageComponent
  ],
  imports: [
    BrowserModule,
    WrongUrlComponent
  ],
  exports: [
    StartPageComponent,
  ],
  providers: [
    TransactionService
  ]
})
export class StartPageModule { }
