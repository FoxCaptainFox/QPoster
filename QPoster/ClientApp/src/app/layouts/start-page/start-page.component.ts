import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/app/services/http/transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { GuestCountDialogComponent } from 'src/app/components/guest-count-dialog/guest-count-dialog.component';
import { IGetTansactionModel } from 'src/app/models/getTransactionModel';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements AfterViewInit {

  isUrlCorrect = false;
  isLoading = false;
  routeData: IGetTansactionModel;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    public dialog: MatDialog,
    private cookie: CookieService) {
  }

  ngAfterViewInit() {

    this.route.queryParams.subscribe(params => {

      const accountname = params['accountname'];
      const token = params['token'];
      const spot_id = params['spot_id'];
      const spot_tablet_id = params['spot_tablet_id'];
      const table_id = params['table_id'];
      const user_id = params['user_id'];

      setTimeout(() => {
        if (environment.noUrlCheck || accountname && token && spot_id && spot_tablet_id && table_id && user_id) {
          this.routeData = {
            accountname: accountname || 'default_account',
            token: token || 'default_token',
            spot_id: spot_id || '0',
            spot_tablet_id: spot_tablet_id || '0',
            table_id: table_id || '0',
            user_id: user_id || '0',
            guests_count: 0,
          };
          this.isUrlCorrect = true;
          this.openDialog();
        }
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(GuestCountDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.routeData.guests_count = result;
      this.transactionService.createTransaction(this.routeData).subscribe((data: any) => {
        data = JSON.parse(data);
        this.cookie.set('account', this.routeData.accountname);
        this.cookie.set('token', this.routeData.token);
        this.cookie.set('transaction', JSON.stringify(data.response));

        this.router.navigate(
          ['.'],
          { relativeTo: this.route }
        );
        window.location.reload();
      });
    });
  }
}
