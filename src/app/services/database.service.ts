import { Injectable } from '@angular/core';
import { Item } from '../item';
import { Category } from '../category';
import items from '../../assets/items.json';
import categories from '../../assets/categories.json';

import { BehaviorSubject, Observable } from 'rxjs';
import { ItemView } from '../itemView';
import { ItemAndStock } from '../ItemAndStock';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private itemsSource: BehaviorSubject<ItemAndStock[]>;
  currentItems: Observable<ItemAndStock[]>;

  categories: Category[] = categories;
  itemViews: ItemAndStock[];

  constructor() {
    console.log('Loaded items: ', items);
    console.log('Loaded categories: ', categories);
    this.categories = this.categories.map(c => this.giveCategoriesTheirParent(c));
    this.itemViews = items.map(i => new ItemAndStock(this.fromItemToItemView(i.item), i.stock));
    this.itemsSource = new BehaviorSubject<ItemAndStock[]>(this.itemViews);
    this.currentItems = this.itemsSource.asObservable();
  }

  giveCategoriesTheirParent(category: Category) {
    if (category.children !== undefined) {
      category.children.forEach(c => {
        c.parent = category;
        this.giveCategoriesTheirParent(c);
      });
    }

    return category;
  }

  categoryOfCategoryNames(categoryNames: string[]): Category | null {
    // ["Dairy", "Milk", "Low Fat Milk"]

    let possibleCategories = this.categories;

    let category: Category;

    for (const name of categoryNames) {

      if (possibleCategories === undefined) {
        break;
      }

      category = possibleCategories.find(c => c.name === name);

      if (category === undefined) {
        console.error('Broke @', name, ' possible categories are:', possibleCategories);
        break;
      }

      possibleCategories = category.children;
    }

    if (category === undefined) {

      console.error('Category not found. Given names were: ', categoryNames);

      return null;
    }

    if (possibleCategories !== undefined && possibleCategories.length > 1) {
      console.warn('Multiple categories:', possibleCategories, 'found when names were', categoryNames);
    }

    return category;
  }

  fromItemToItemView(item: Item): ItemView {
    const category = this.categoryOfCategoryNames(item.categoryNames);
    return new ItemView(item, category);
  }

  searchedInBox(query: string): void {
    this.itemsSource.next(this.searchInItems(query));
  }

  searchedInMenu(category: Category): void {
    this.itemsSource.next(this.searchInItemsByCategory(category));
  }

  searchInItemsByCategory(category: Category): ItemAndStock[] {
    return this.itemViews.filter(item => {
      let current = item.category;

      while (current) {
        if (current === category) {
          return true;
        }
        current = current.parent;
      }

      return false;
    });
  }

  searchInItems(query: string): ItemAndStock[] {
    return this.itemViews.filter(itemView => {
      return itemView.name.toLowerCase().match(query.toLowerCase())
        || itemView.id === Number.parseInt(query, 10)
        || itemView.brand.toLowerCase().match(query.toLowerCase())
        || this.isACategoryName(query, itemView.categoryNames);
    });
  }

  isACategoryName(name: string, categoryNames: string[]): boolean {
    return categoryNames.map(cn => cn.toLowerCase()).some(cn => cn === name.toLowerCase());
  }

}
