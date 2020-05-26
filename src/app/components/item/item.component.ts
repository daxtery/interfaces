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
  @Input() quantity: number;

  message = new FormControl('Info about the action');

  constructor(private cart: CartService) {
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
