import { Injectable } from '@angular/core';
import { Item } from '../item';
import { Category } from '../category';
import items from '../../assets/items.json';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private itemsSource = new BehaviorSubject<Item[]>(items);
  currentItems = this.itemsSource.asObservable();

  constructor() {
    console.log('items: ', items);
  }

  searchedInBox(query: string): void {
    this.itemsSource.next(this.searchInItems(query));
  }

  searchedInMenu(category: Category): void {
    this.itemsSource.next(this.searchInItemsByCategory(category));
  }

  searchInItemsByCategory(category: Category): Item[] {
    return items.filter(item => item.category === category);
  }

  searchInItems(query: string): Item[] {
    return items.filter(item => {
      return item.name.toLowerCase().match(query.toLowerCase())
        || item.id === Number.parseInt(query, 10)
        || item.brand.toLowerCase().match(query.toLowerCase())
        || this.isACategoryName(query, item);
    });
  }

  isACategoryName(name: string, category: Category) {
    let temp = category;

    while (temp) {
      if (temp.name.toLowerCase().match(name.toLowerCase())) { return true; }
      temp = temp.child;
    }

    return false;
  }

}
