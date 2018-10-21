import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../models/IProduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: IProduct;
  @Output() onAdded = new EventEmitter<IProduct>();
  @Output() onDeleted = new EventEmitter<IProduct>();

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
    if (this.product.count == 0 && !flag){
      return;
    }

    if (flag){
      this.product.count++;
      this.onAdded.emit(this.product);
    }
    else{
      this.product.count--;
      this.onDeleted.emit(this.product);
    }
  }
}
