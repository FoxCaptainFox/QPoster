import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { IProductDataModel } from '../../models/IProductDataModel';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EndDialogComponent } from '../../components/end-dialog/end-dialog.component';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CheckComponent implements OnInit {

  count = 1;

  @Input() checkProducts: IProductDataModel

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(EndDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }
}
