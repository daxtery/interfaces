import { Injectable } from '@angular/core';
import { Item } from '../item';
import { BehaviorSubject, range } from 'rxjs';
import { last, filter, pairwise, skip, distinctUntilChanged } from 'rxjs/operators';
import { CartItem } from '../cartItem';
import { CartViewComponent } from '../components/cart-view/cart-view.component';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private lastItemsAndQuantityInCartSource: Map<Item, CartItem> = new Map<Item, CartItem>();

  private itemsAndQuantityInCartSource = new BehaviorSubject<Map<Item, CartItem>>(new Map<Item, CartItem>());
  currentItemsAndQuantities = this.itemsAndQuantityInCartSource.asObservable();

  constructor() {
    this.itemsAndQuantityInCartSource.pipe(pairwise()).subscribe(x => this.lastItemsAndQuantityInCartSource = x[0]);
  }

  public addUnitOfItem(item: Item) {

    console.log('+1 to cart', item);

    const temp = new Map<Item, CartItem>(this.itemsAndQuantityInCartSource.value.entries());

    const cartItem = temp.get(item) || new CartItem(item, 0);
    cartItem.quantity++;
    temp.set(item, cartItem);

    this.itemsAndQuantityInCartSource.next(temp);
  }

  public removeUnitOfItem(item: Item) {

    console.log('-1 from cart', item);

    const temp = new Map<Item, CartItem>(this.itemsAndQuantityInCartSource.value.entries());

    const oldValue = temp.get(item);

    // there
    if (oldValue !== undefined) {
      if (oldValue.quantity === 1) {
        this.removeItem(item);
        return;
      } else {
        oldValue.quantity--;
        temp.set(item, oldValue);
      }
    }

    this.itemsAndQuantityInCartSource.next(temp);
  }

  public removeItem(item: Item) {

    console.log('remove from cart', item);

    const temp = new Map<Item, CartItem>(this.itemsAndQuantityInCartSource.value.entries());
    temp.delete(item);

    this.itemsAndQuantityInCartSource.next(temp);
  }

  public quantityOfItem(item: Item): number {
    return this.itemsAndQuantityInCartSource.value.get(item)?.quantity || 0;
  }

  public undoLastOperation() {
    console.log('Reverting to ', this.lastItemsAndQuantityInCartSource);
    this.itemsAndQuantityInCartSource.next(this.lastItemsAndQuantityInCartSource);
    this.lastItemsAndQuantityInCartSource = null;
  }

  public canUndo(): boolean {
    return this.lastItemsAndQuantityInCartSource !== null;
  }

  public priceTotal(): number {

    return Array.from(this.itemsAndQuantityInCartSource.value.entries(),
      ([_, cartItem]: [Item, CartItem]) => cartItem.price).reduce((acc, b) => acc + b, 0);

  }

  public numberOfItems(): number {

    return Array.from(this.itemsAndQuantityInCartSource.value.entries(),
      ([_, cartItem]: [Item, CartItem]) => cartItem.quantity).reduce((acc, b) => acc + b, 0);

  }

  public priceOf(item: Item): number {
    return this.itemsAndQuantityInCartSource.value.get(item)?.price || 0;
  }

  public clear(){
    this.itemsAndQuantityInCartSource.next(new Map<Item, CartItem>());
  }

}
