import { Component } from '@angular/core';
import { ItemViewService } from 'src/app/services/item-view.service';
import { Category } from 'src/app/category';
import { DatabaseService } from 'src/app/services/database.service';
import { CartService } from 'src/app/services/cart.service';
import { ItemView } from 'src/app/itemView';
import { SearchService } from 'src/app/services/search.service';
import { ItemAndStock } from 'src/app/ItemAndStock';
import { Ordering } from 'src/app/brandSelect copy';

@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.css']
})
export class ItemsViewComponent {

  items: ItemAndStock[] = [];
  itemsFromDataBase: ItemAndStock[] = [];
  categoriesAllowed: Category[] = [];
  brandsAllowed: string[] = [];
  ordering: Ordering = new Ordering([], new Map<string, boolean>(), new Map<string, (a: ItemAndStock) => number>());

  searched: string;

  constructor(private cart: CartService, service: ItemViewService, database: DatabaseService, search: SearchService) {
    service.currentBrands.subscribe(brands => this.changeFilterByBrand(brands));
    service.currentCategories.subscribe(categories => this.changeFilterByType(categories));
    service.currentOrders.subscribe(newOrders => this.changeOrdering(newOrders));
    database.currentItems.subscribe(items => {
      this.itemsFromDataBase = items;
      this.items = this.sortNewItems(this.itemsFromDataBase);
    });
    search.currentSearch.subscribe(q => this.searched = q);
  }

  public changeFilterByType(allowed: Category[]): void {
    this.categoriesAllowed = allowed;
    console.log('New categories are', allowed);
    this.items = this.filterAndSortNewItems(this.itemsFromDataBase);
  }

  categoriesAreTheSameDeep(allowed: Category, fromItem: Category): boolean {
    if (allowed === fromItem) { return true; }

    if (fromItem.children) {
      return fromItem.children.find(c => this.categoriesAreTheSameDeep(allowed, c)) !== undefined;
    }

    return false;
  }

  itemIsAllowedByCategories(item: ItemAndStock, categories: Category[]): boolean {
    return categories.some(c => this.categoriesAreTheSameDeep(c, item.category));
  }

  itemIsAllowedByBrands(item: ItemAndStock, brands: string[]): boolean {
    return brands.some(b => item.brand === b);
  }

  filterNewItems(items: ItemAndStock[]) {
    return items.filter(item => {
      const isIt = this.itemIsAllowedByBrands(item, this.brandsAllowed)
        && this.itemIsAllowedByCategories(item, this.categoriesAllowed);
      console.log('Filtering', item, 'brandsAre:', this.brandsAllowed, 'categoriesAre:', this.categoriesAllowed, isIt);
      return isIt;
    });
  }

  filterAndSortNewItems(items: ItemAndStock[]) {
    return this.sortNewItems(this.filterNewItems(items));
  }

  sortNewItems(items: ItemAndStock[]) {

    const compareFn = (a: ItemAndStock, b: ItemAndStock) => {

      for (const order of this.ordering.orders) {

        console.log('Comparing a', a, ' and b:', b, 'and order is', order);

        const fn = this.ordering.orderMapping.get(order);

        const result = this.ordering.ascendingOrder.get(order) ?
          fn(a) - fn(b) :
          fn(b) - fn(a);

        if (result === 0) { continue; }

        return result;
      }

      console.error('Reached end?');

      return 0;
    };


    return items.sort(compareFn);
  }


  changeOrdering(ordering: Ordering) {
    this.ordering = ordering;
    console.log('New sorting:', ordering);
    this.items = this.filterAndSortNewItems(this.itemsFromDataBase);
  }

  public changeFilterByBrand(allowed: string[]): void {
    this.brandsAllowed = allowed;
    console.log('New brands are', allowed);
    this.items = this.filterAndSortNewItems(this.itemsFromDataBase);
  }

  public quantityOfItem(item: ItemView): number {
    return this.cart.quantityOfItem(item);
  }

  public setLastSearch(search: string) {
    this.searched = search;
  }

}
