import { Component, OnInit, Input } from '@angular/core';
import { ICategory } from '../../models/ICategory';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() category: ICategory;

  constructor() { }

  ngOnInit() {
  }

  transformImage(image: string) {
    if(image == null){
      return 'assets/images/default_product.png'
    }
    return `https://posterhack.joinposter.com${image}`;
  }

}
