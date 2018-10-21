import { Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import { ICategory } from '../../models/ICategory';
import { IProductDataModel } from '../../models/IProductDataModel';
import { IProduct } from '../../models/IProduct';
import { Observable } from 'rxjs';
import { MenuService } from '../../services/menu.service';
import { map } from 'rxjs/operators';
import { CategoriesService } from 'src/app/services/local/categories.service';
import { TransactionService } from '../../services/http/transaction.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoriesComponent implements OnInit {
  @Input() companyName: string;

  categories: Observable<ICategory[]>;
  products: Observable<IProduct[]>;
  productsToBuy: IProduct[] = [];
  parentCategory = null;
  category_id;

  constructor(private menuService: MenuService,
    private categoriesService: CategoriesService,
    private transactionService: TransactionService,
    private cookie: CookieService) { }

  ngOnInit() {
    this.getDefaultMenu();

    this.categoriesService.clickEvent.subscribe(() => {
      this.categoriesService.setButtonVisibility(false);
      this.getDefaultMenu();
    });

    this.categoriesService.confirmMenuEvent.subscribe(() => {
      if(this.productsToBuy.length == 0){
        return;
      }
      else{
        let productsToServer: IProductDataModel[] = [];
        this.productsToBuy.forEach(product => {
          productsToServer.push({
            name : product.product_name,
            transactionId : +JSON.parse(this.cookie.get('transaction')).transaction_id,
            productId : +product.product_id as number,
            price : +product.price[1] as number,
            count : +product.count
          })
        });
        this.transactionService.addTransaction(productsToServer).subscribe();
      }
      this.productsToBuy = [];
    });
  }

  getDefaultMenu() {
    this.getCategories();
    this.getProducts(0);
  }

  getProductsInCategory(category_id) {
    this.categoriesService.setButtonVisibility(true);
    this.categories = new Observable<ICategory[]>();
    this.getProducts(category_id);
  }

  getProducts(category_id) {
    this.products = this.menuService.getProducts(category_id).pipe(
      map((result: any) => {
        const temp = result.response as IProduct[];
        temp.forEach(element => {
          this.productsToBuy.forEach(product => {
            if (element.product_name === product.product_name) {
              element.count = product.count;
            }
          });
          if (!element.count) {
            element.count = 0;
          }
        });
        return temp;
      })
    );

    this.products.subscribe();
  }

  getCategories() {
    this.categories = this.menuService.getCategories().pipe(
      map((result: any) => {
        return result.response as ICategory[];
      })
    );

    this.categories.subscribe();
  }

  addToCheck(product: IProduct) {
    if (product.count === 1) {
      this.productsToBuy.push(product);
      console.log(this.productsToBuy);
    }
  }

  deleteFromCheck(product: IProduct) {
    if (product.count === 0) {
      this.productsToBuy = this.productsToBuy.filter(x => x.product_name !== product.product_name);
      console.log(this.productsToBuy);
    }
  }
}
