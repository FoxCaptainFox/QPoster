import { Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import { ICategory } from '../../models/ICategory';
import { IProduct } from '../../models/IProduct';
import { Observable } from 'rxjs';
import { MenuService } from '../../services/menu.service';
import { map } from 'rxjs/operators';
import { CategoriesService } from 'src/app/services/local/categories.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoriesComponent implements OnInit {
  @Input() companyName: string;

  isBtnVisible = false;
  categories: Observable<ICategory[]>;
  products: Observable<IProduct[]>;
  parentCategory = null;
  category_id;

  constructor(private menuService: MenuService,
    private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.getDefaultMenu();

    this.categoriesService.clickEvent.subscribe(() => {
      this.categoriesService.setButtonVisibility(false);
      this.getDefaultMenu();
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
        return result.response as IProduct[];
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
}
