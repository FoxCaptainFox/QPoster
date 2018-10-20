import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../../models/IProduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: IProduct;

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
