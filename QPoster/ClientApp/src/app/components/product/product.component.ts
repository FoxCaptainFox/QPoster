import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../models/IProduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() product: IProduct;
  @Output() added = new EventEmitter<IProduct>();
  @Output() deleted = new EventEmitter<IProduct>();

  transformImage(image: string) {
    if (image === '') {
      return 'assets/images/default_product.png';
    }
    return `https://posterhack.joinposter.com${image}`;
  }

  increaseDecreaseCount(flag: Boolean) {
    if (this.product.count === 0 && !flag) {
      return;
    }

    if (flag) {
      this.product.count++;
      this.added.emit(this.product);
    } else {
      this.product.count--;
      this.deleted.emit(this.product);
    }
  }
}
