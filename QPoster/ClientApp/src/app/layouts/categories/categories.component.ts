import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ICategory } from '../../models/ICategory';
import { IProduct } from '../../models/IProduct';
import { Observable } from 'rxjs';
import { MenuService } from '../../services/menu.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoriesComponent implements OnInit {

  categories: Observable<ICategory[]>; 
  products: Observable<IProduct[]>; 
  parentCategory = null;
  category_id;

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.getMenu()
  }

  getMenu(){
    this.categories = this.menuService.getCategories().pipe(
      map((result: any) => {
        return result.response as ICategory[]
      })
    );

    this.categories.subscribe();

    this.products = this.menuService.getProducts(1).pipe(
      map((result: any) => {
        return result.response as IProduct[];
      })
    );

    this.products.subscribe();
  }

  getProductsInCategory(category_id){
    console.log(category_id);
    this.categories = new Observable<ICategory[]>();

    this.products = this.menuService.getProducts(category_id).pipe(
      map((result: any) => {
        return result.response as IProduct[];
      })
    );

    this.products.subscribe();
  }
}
