import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Item } from 'src/app/item';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CartViewComponent implements OnInit {

  dataSource: CartViewItem[] = [];

  columnsToDisplay = ['name', 'brand', 'price', 'quantity'];
  expandedElement: CartViewItem | null;
  cart: CartService;

  constructor(cart: CartService) {
    this.cart = cart;
    cart.currentItemsAndQuantities.subscribe((i) => this.prepareDataToShow(i));
  }

  ngOnInit() {
  }

  prepareDataToShow(itemsAndQuantities: Map<Item, number>) {

    this.dataSource = Array.from(itemsAndQuantities.entries(),
      pair => new CartViewItem(pair[0], pair[1])
    );

  }

  undoOnce() {
    this.cart.undoLastOperation();
  }

}

class CartViewItem {

  quantity: number;
  item: Item;

  constructor(item: Item, quantity: number) {
    this.quantity = quantity;
    this.item = item;
  }

  public get price(): number {
    return this.item.unitaryPrice * this.quantity;
  }

  public get name(): string {
    return this.item.name;
  }

  public get brand(): string {
    return this.item.brand;
  }

}
