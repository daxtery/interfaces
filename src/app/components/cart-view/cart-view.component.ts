import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Item } from 'src/app/item';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CartItem } from 'src/app/cartItem';

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
export class CartViewComponent {

  dataSource: CartItem[] = [];

  columnsToDisplay = ['name', 'brand', 'price', 'quantity'];
  expandedElement: CartItem | null;
  cart: CartService;

  constructor(cart: CartService) {
    this.cart = cart;
    cart.currentItemsAndQuantities.subscribe((i) => this.prepareDataToShow(i));
  }

  prepareDataToShow(itemsAndQuantities: Map<Item, CartItem>) {
    this.dataSource = Array.from(itemsAndQuantities.values());
  }

  undoOnce() {
    this.cart.undoLastOperation();
  }

}
