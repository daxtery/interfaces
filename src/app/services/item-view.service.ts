import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../category';
import { skip } from 'rxjs/operators';
import { ItemAndStock } from '../ItemAndStock';
import { Ordering } from '../brandSelect copy';

@Injectable({
  providedIn: 'root'
})
export class ItemViewService {

  private brandsSource = new BehaviorSubject<string[]>([]);
  currentBrands = this.brandsSource.asObservable().pipe(skip(1));

  private categoriesSource = new BehaviorSubject<Category[]>([]);
  currentCategories = this.categoriesSource.asObservable().pipe(skip(1));

  private ordersSource = new BehaviorSubject<Ordering>(null);

  currentOrders = this.ordersSource.asObservable().pipe(skip(1));

  constructor() {
  }

  changedBrands(allowed: string[]): void {
    this.brandsSource.next(allowed);
  }

  changedCategories(allowed: Category[]): void {
    this.categoriesSource.next(allowed);
  }

  changedOrders(orders: string[], ascendingOrder: Map<string, boolean>, orderMapping: Map<string, (a: ItemAndStock) => number>) {
    this.ordersSource.next(new Ordering(orders, ascendingOrder, orderMapping));
  }
}
