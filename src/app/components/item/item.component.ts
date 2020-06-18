import { Component, Input, Inject } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ItemAndStock } from 'src/app/services/database.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  @Input() item: ItemAndStock;
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
  constructor(@Inject(MAT_DIALOG_DATA) public item: ItemAndStock) { }
}
