import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../item';
import { ItemViewService } from 'src/app/services/item-view.service';
import { Category } from 'src/app/category';
import { DatabaseService } from 'src/app/services/database.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.css']
})
export class ItemsViewComponent implements OnInit {

  items: Item[] = [];
  itemsFromDataBase: Item[] = [];

  constructor(private cart: CartService, service: ItemViewService, database: DatabaseService) {
    service.currentBrands.subscribe(brands => this.changeFilterByBrand(brands));
    service.currentCategories.subscribe(categories => this.changeFilterByType(categories));
    database.currentItems.subscribe(items => this.items = this.itemsFromDataBase = items);
  }

  // searchInItemsByCategory(category: Category): Item[] {
  //   return items.filter(item => item.category === category);
  // }

  // searchInItems(query: string): Item[] {
  //   return items.filter(item => {
  //     return item.name.toLowerCase().match(query.toLowerCase())
  //       || item.id === Number.parseInt(query, 10)
  //       || item.brand.toLowerCase().match(query.toLowerCase())
  //       || item.category.name.toLowerCase().match(query.toLowerCase());
  //   });
  // }

  public changeFilterByType(allowed: Category[]): void {
    this.items = this.itemsFromDataBase.filter(item => true);
  }

  public changeFilterByBrand(allowed: string[]): void {
    this.items = this.itemsFromDataBase.filter(item => allowed.includes(item.brand));
  }

  public quantityOfItem(item: Item): number {
    return this.cart.quantityOfItem(item);
  }

  ngOnInit() {
  }

}
