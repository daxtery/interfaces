import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/item';
import { CartService } from 'src/app/services/cart.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item: Item;
  cart: CartService;

  message = new FormControl('Info about the action');

  constructor(cart: CartService) {
    this.cart = cart;
  }

  addToCart() {
    this.cart.addUnitOfItem(this.item);
  }

  removeFromCart() {
    this.cart.removeUnitOfItem(this.item);
  }

  ngOnInit() {
  }

}
