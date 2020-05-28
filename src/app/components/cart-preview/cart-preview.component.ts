import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { Item } from 'src/app/item';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.css']
})
export class CartPreviewComponent {

  quantities: number;

  constructor(private route: ActivatedRoute, private router: Router, cart: CartService) {
    cart.currentItemsAndQuantities.subscribe((_) => this.quantities = cart.numberOfItems());
  }

  goToCart() {
    this.router.navigate(['cart'], { relativeTo: this.route });
  }

}
