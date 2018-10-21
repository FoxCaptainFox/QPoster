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
    if(image == ''){
      return 'assets/images/default_product.png';
    }
    return `https://posterhack.joinposter.com${image}`;
  }

  increaseDecreaseCount(flag: Boolean){
    console.log(flag);
    if (this.product.count == 0 && !flag){
      return;
    }
    flag ? this.product.count++ : this.product.count--;
  }
}
