import { Injectable } from '@angular/core';
import { Item } from '../item';
import { BehaviorSubject, range } from 'rxjs';
import { last, filter, pairwise, skip, distinctUntilChanged } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private lastItemsAndQuantityInCartSource: Map<Item, number> = new Map<Item, number>();

  private itemsAndQuantityInCartSource = new BehaviorSubject<Map<Item, number>>(new Map<Item, number>());
  currentItemsAndQuantities = this.itemsAndQuantityInCartSource.asObservable();

  constructor() {
    this.itemsAndQuantityInCartSource.pipe(pairwise()).subscribe(x => this.lastItemsAndQuantityInCartSource = x[0]);
  }

  public addUnitOfItem(item: Item) {

    console.log('+1 to cart', item);

    const temp = new Map<Item, number>(this.itemsAndQuantityInCartSource.value.entries());

    let oldValue = temp.get(item) || 0;
    temp.set(item, ++oldValue);

    this.itemsAndQuantityInCartSource.next(temp);
  }

  public removeUnitOfItem(item: Item) {

    console.log('-1 from cart', item);

    const temp = new Map<Item, number>(this.itemsAndQuantityInCartSource.value.entries());

    let oldValue = temp.get(item);

    // there
    if (oldValue !== undefined) {
      temp.set(item, --oldValue);
    }

    this.itemsAndQuantityInCartSource.next(temp);
  }

  public removeItem(item: Item) {

    console.log('remove from cart', item);

    const temp = new Map<Item, number>(this.itemsAndQuantityInCartSource.value.entries());
    temp.delete(item);

    this.itemsAndQuantityInCartSource.next(temp);
  }

  public quantityOfItem(item: Item): number {
    return this.itemsAndQuantityInCartSource.value.get(item) || 0;
  }

  public undoLastOperation() {
    console.log('Reverting to ', this.lastItemsAndQuantityInCartSource);
    this.itemsAndQuantityInCartSource.next(this.lastItemsAndQuantityInCartSource);
    this.lastItemsAndQuantityInCartSource = null;
  }

  public canUndo(): boolean {
    return this.lastItemsAndQuantityInCartSource !== null;
  }

  public getTotalCost(): number {

    return Array.from(this.itemsAndQuantityInCartSource.value.entries(),
      ([item, quantity]: [Item, number]) => item.unitaryPrice * quantity).reduce((acc, b) => acc + b, 0);

  }

}
