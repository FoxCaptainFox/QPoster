import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

@Component({
  selector: 'page-qr-code-scan',
  templateUrl: 'qrCodeScan.html'
})
export class QRCodeScanPage {

  light = false;

  constructor(
    public navCtrl: NavController,
    private qrScanner: QRScanner,
    platform: Platform,
    private androidFullScreen: AndroidFullScreen
  ) {

      platform.ready().then(() => {
        this.androidFullScreen.isImmersiveModeSupported()
        .then(() => {
          this.androidFullScreen.immersiveMode();
          this.qrCodeScaningStart();
        })
        .catch(err => console.log(err));
      });
  }

  qrCodeScaningStart() {
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // start scanning
        this.qrScanner.show();
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);          
          scanSub.unsubscribe(); // stop scanning
        });

      } else if (status.denied) {
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => console.log('Error is', e));
  }

  enableLighting() {
    this.light = !this.light;

    if(this.light) {
      this.qrScanner.enableLight();
    } else {
      this.qrScanner.disableLight();
    }
  }
}
