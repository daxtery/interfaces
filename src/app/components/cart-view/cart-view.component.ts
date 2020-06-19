import { Component, Inject, AfterViewInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Item } from 'src/app/item';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CartItem } from 'src/app/cartItem';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from 'src/app/order';
import { Router } from '@angular/router';

export interface DialogData {
  price: number;
}

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

  constructor(cart: CartService, public dialog: MatDialog, private router: Router) {
    this.cart = cart;
    cart.currentItemsAndQuantities.subscribe((i) => this.prepareDataToShow(i));
  }

  prepareDataToShow(itemsAndQuantities: Map<Item, CartItem>) {
    this.dataSource = Array.from(itemsAndQuantities.values());
  }

  undoOnce() {
    this.cart.undoLastOperation();
  }


  openCheckoutDialog() {
    const dialogRef = this.dialog.open(DialogDataExampleDialog, { data: { price: this.cart.priceTotal() } });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result && result === true) {
        this.openReceiptDialog();
      }
    });
  }

  openReceiptDialog() {
    const newOrder = new Order(Array.from(this.dataSource), this.cart.priceTotal(), this.cart.numberOfItems());
    const dialogRef = this.dialog.open(ReceiptDialog, { data: newOrder, minWidth: '80vw' });

    dialogRef.afterClosed().subscribe(_ => {
      this.cart.clear();
      this.router.navigate(['']);
    });
  }

}

@Component({
  selector: 'app-cart-checkout-dialog',
  templateUrl: 'cart-checkout-dialog.html',
})
export class DialogDataExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogDataExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-cart-receipt-dialog',
  templateUrl: 'cart-receipt-dialog.html',
})
export class ReceiptDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Order) {
  }

}
