import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class CategoriesService {

  @Output() buttonIsVisible: EventEmitter<boolean> = new EventEmitter();
  @Output() confirmButtonIsVisible: EventEmitter<boolean> = new EventEmitter();
  @Output() clickEvent: EventEmitter<void> = new EventEmitter();
  @Output() confirmMenuEvent: EventEmitter<void> = new EventEmitter();

  setButtonVisibility(visibility) {
    this.buttonIsVisible.emit(visibility);
  }
}
