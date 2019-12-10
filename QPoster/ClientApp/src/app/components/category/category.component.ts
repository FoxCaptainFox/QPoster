import { Component, Input } from '@angular/core';
import { ICategory } from '../../models/ICategory';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  @Input() category: ICategory;

  transformImage(image: string) {
    if (!image) {
      return 'assets/images/default_product.png';
    }
    return `https://posterhack.joinposter.com${image}`;
  }
}
