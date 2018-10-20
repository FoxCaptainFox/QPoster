import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StartPageComponent } from './start-page.component';
import { TransactionService } from 'src/app/services/http/transaction.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { WrongUrlModel } from 'src/app/components/wrong-url/wrong-url.module';
import { GuestCountDialogComponent } from 'src/app/components/guest-count-dialog/guest-count-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StartPageComponent,
    GuestCountDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    WrongUrlModel,
    MatDialogModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    StartPageComponent,
  ],
  providers: [
    TransactionService
  ],
  entryComponents: [
    GuestCountDialogComponent
  ],
})
export class StartPageModule { }
