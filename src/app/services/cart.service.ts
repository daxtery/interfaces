import { Injectable } from '@angular/core';
import { Item } from '../item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private itemsAndQuantityInCartSource = new BehaviorSubject<{ [itemID: number]: number }>({});
  currentItemsAndQuantities = this.itemsAndQuantityInCartSource.asObservable();

  constructor() { }

  public addItem(item: Item): void {

    console.log('Adding to cart', item);

    const temp = this.itemsAndQuantityInCartSource.value;

    // not there
    if (temp[item.id] === undefined) {
      temp[item.id] = 0;
    }

    temp[item.id]++;

    this.itemsAndQuantityInCartSource.next(temp);
  }

  public removeItem(item: Item): void {

    const temp = this.itemsAndQuantityInCartSource.value;

    // there
    if (temp[item.id] !== undefined) {
      temp[item.id]--;
    }

    this.itemsAndQuantityInCartSource.next(temp);
  }

  public quantityOfItem(item: Item): number {
    const temp = this.itemsAndQuantityInCartSource.value;
    return temp[item.id] === undefined ? 0 : temp[item.id];
  }

}
