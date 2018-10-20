import { Component, ViewEncapsulation} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './guest-count-dialog.component.html',
  styleUrls: ['./guest-count-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GuestCountDialogComponent {

  count = 1;

  constructor(public dialogRef: MatDialogRef<GuestCountDialogComponent>) { }

  closeDialog() {
    if (this.count > 0) {
      this.dialogRef.close(this.count.toString());
    }
  }
}
