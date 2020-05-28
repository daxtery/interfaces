import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../item';
import { ItemViewService } from 'src/app/services/item-view.service';
import { Category } from 'src/app/category';
import { DatabaseService } from 'src/app/services/database.service';
import { CartService } from 'src/app/services/cart.service';
import { ItemView } from 'src/app/itemView';

@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.css']
})
export class ItemsViewComponent {

  items: ItemView[] = [];
  itemsFromDataBase: ItemView[] = [];
  categoriesAllowed: Category[] = [];
  brandsAllowed: string[] = [];

  constructor(private cart: CartService, service: ItemViewService, database: DatabaseService) {
    service.currentBrands.subscribe(brands => this.changeFilterByBrand(brands));
    service.currentCategories.subscribe(categories => this.changeFilterByType(categories));
    database.currentItems.subscribe(items => this.items = this.itemsFromDataBase = items);
  }

  public changeFilterByType(allowed: Category[]): void {
    this.categoriesAllowed = allowed;
    console.log('New categories are', allowed);
    this.filterNewItems();
  }

  categoriesAreTheSameDeep(allowed: Category, fromItem: Category): boolean {
    if (allowed === fromItem) { return true; }

    if (fromItem.children) {
      return fromItem.children.find(c => this.categoriesAreTheSameDeep(allowed, c)) !== undefined;
    }

    return false;
  }

  itemIsAllowedByCategories(item: ItemView, categories: Category[]): boolean {
    return categories.some(c => this.categoriesAreTheSameDeep(c, item.category));
  }

  itemIsAllowedByBrands(item: ItemView, brands: string[]): boolean {
    return brands.some(b => item.brand === b);
  }

  filterNewItems() {
    this.items = this.itemsFromDataBase.filter(item => {
      const isIt = this.itemIsAllowedByBrands(item, this.brandsAllowed)
        && this.itemIsAllowedByCategories(item, this.categoriesAllowed);
      console.log('Filtering', item, 'brandsAre:', this.brandsAllowed, 'categoriesAre:', this.categoriesAllowed, isIt);
      return isIt;
    });
  }

  public changeFilterByBrand(allowed: string[]): void {
    this.brandsAllowed = allowed;
    console.log('New brands are', allowed);
    this.filterNewItems();
  }

  public quantityOfItem(item: ItemView): number {
    return this.cart.quantityOfItem(item);
  }


}
