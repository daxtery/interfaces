import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item: Item;
  @Input() quantity: number;

  constructor(private cart: CartService) {
  }

  addToCart() {
    this.cart.addItem(this.item);
  }

  removeFromCart() {
    this.cart.removeItem(this.item);
  }

  ngOnInit() {
  }

}
