import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from 'src/app/services/http/transaction.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  isWrongUlr = false;

  constructor(private router: ActivatedRoute,
    private transactionService: TransactionService,
    public dialog: MatDialog) {}

  ngOnInit() {

    this.router.queryParams.subscribe(params => {
      const token = params['token'];
      const spot_id = params['spot_id'];
      const spot_tablet_id = params['spot_tablet_id'];
      const table_id = params['table_id'];
      const user_id = params['user_id'];

      if (token || spot_id || spot_tablet_id || table_id || user_id) {
        this.isWrongUlr = true;
        return;
      }

      
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
