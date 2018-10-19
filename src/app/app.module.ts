import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { QRScanner } from '@ionic-native/qr-scanner';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { QRCodeScanPage } from '../pages/qrCodeScan/qrCodeScan';

@NgModule({
  declarations: [
    MyApp,
    QRCodeScanPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    QRCodeScanPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    AndroidFullScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
