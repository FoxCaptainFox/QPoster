import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AboutService } from '../../services/about-service.service';
import { ICompanyNameOrLogo } from '../../models/ICompanyNameOrLogo';
import { IProductDataModel } from '../../models/IProductDataModel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriesService } from 'src/app/services/local/categories.service';
import { TransactionService } from '../../services/http/transaction.service';
import { NotificationService } from 'src/app/services/http/notificationService';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  companyName: Observable<ICompanyNameOrLogo>;

  isButtonVisible = false;
  isButtonConfirmVisible = true;
  checkProducts : IProductDataModel[] = [];

  constructor(private aboutService: AboutService,
    private categotiesService: CategoriesService,
    private transactionService: TransactionService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.companyName = this.aboutService.getCompanyName().pipe(
      map((x: any) => x.response as ICompanyNameOrLogo)
    );

    this.categotiesService.buttonIsVisible.subscribe(visibility => {
      this.isButtonVisible = visibility;
    });
  }

  backClick() {
    this.categotiesService.clickEvent.emit();
  }

  confirmClick() {
    this.categotiesService.confirmMenuEvent.emit();
  }

  setVisibility(num:any){
    switch(num){
      case 1:{
        this.isButtonConfirmVisible = true;
        break;
      }
      case 0:{
        this.checkProducts = []
        this.isButtonConfirmVisible = false;
        this.transactionService.getTransaction()
        .subscribe((data:IProductDataModel[]) => (this.checkProducts = data));
      }
      case 2:{
        this.isButtonConfirmVisible = false;
      }
    }
  }
  notify() {
    this.notificationService.notify().subscribe();
  }
}

