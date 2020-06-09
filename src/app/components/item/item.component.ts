import { Component, OnInit, Input, Inject } from '@angular/core';
import { Item } from 'src/app/item';
import { CartService } from 'src/app/services/cart.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  @Input() item: Item;
  cart: CartService;

  constructor(cart: CartService, public dialog: MatDialog) {
    this.cart = cart;
  }

  addToCart() {
    this.cart.addUnitOfItem(this.item);
  }

  removeFromCart() {
    this.cart.removeUnitOfItem(this.item);
  }

  openDetailsDialog() {
    this.dialog.open(ItemDetailsDialog, { data: this.item });
  }

}

@Component({
  selector: 'app-item-details-dialog',
  templateUrl: './item-details-dialog.html',
})
export class ItemDetailsDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public item: Item) { }
}
