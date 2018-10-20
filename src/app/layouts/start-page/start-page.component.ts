import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from 'src/app/services/http/transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { GuestCountDialogComponent } from 'src/app/components/guest-count-dialog/guest-count-dialog.component';
import { IGetTansactionModel } from 'src/app/models/getTransactionModel';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements AfterViewInit {

  isWrongUrl = false;
  isLoading = false;
  routeData: IGetTansactionModel;

  constructor(private router: ActivatedRoute,
    private transactionService: TransactionService,
    public dialog: MatDialog) {}

  ngAfterViewInit() {

    this.router.queryParams.subscribe(params => {

      const accountname = params['accountname'];
      const token = params['token'];
      const spot_id = params['spot_id'];
      const spot_tablet_id = params['spot_tablet_id'];
      const table_id = params['table_id'];
      const user_id = params['user_id'];

      setTimeout(() => {
        if (!accountname || !token || !spot_id || !spot_tablet_id || !table_id || !user_id) {
          this.isWrongUrl = true;
        } else {
          this.routeData = {
            accountname: accountname,
            token: token,
            spot_id: spot_id,
            spot_tablet_id: spot_tablet_id,
            table_id: table_id,
            user_id: user_id,
            guests_count: 0
          };
          this.isWrongUrl = false;
          this.openDialog();
        }
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(GuestCountDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.routeData.guests_count = result;
      this.transactionService.createTransaction(this.routeData).subscribe(response => {
        console.log(response);
      });
    });
  }
}
