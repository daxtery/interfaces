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

  columnsToDisplay = ['item', 'price', 'quantity'];
  expandedElement: CartViewItem | null;
  cart: CartService;

  constructor(cart: CartService) {

    this.cart = cart;

    cart.currentItemsAndQuantities.subscribe((i) => this.prepareDataToShow(i));

    const i1 = {
      brand: 'cool',
      category: { name: 'Z' },
      id: 10,
      name: 'Dude',
      pictureUrl: '...',
      unitaryPrice: 100,
      unitaryWeight: 100,
      weightType: 'g'
    };

    cart.addUnitOfItem(i1);

    cart.addUnitOfItem(i1);

    const i2 = {
      brand: 'bad',
      category: { name: 'Y' },
      id: 11,
      name: 'Not cool',
      pictureUrl: '...',
      unitaryPrice: 54.0,
      unitaryWeight: 11,
      weightType: 'L'
    };

    cart.addUnitOfItem(i2);
  }

  ngOnInit() {
  }

  prepareDataToShow(itemsAndQuantities: Map<Item, number>) {
    this.dataSource = Array.from(itemsAndQuantities.entries(), pair => (
      {
        item: pair[0],
        price: pair[0].unitaryPrice * pair[1],
        quantity: pair[1],
      }
    ));
  }

  undoOnce() {
    this.cart.undoLastOperation();
  }
}

interface CartViewItem {
  item: Item;
  price: number;
}
