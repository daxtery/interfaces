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
export class CartPreviewComponent implements OnInit {

  quantities: number;

  constructor(private route: ActivatedRoute, private router: Router, cart: CartService) {
    cart.currentItemsAndQuantities.subscribe((d) => this.updateToShowInBadge(d));
  }

  ngOnInit() {
  }

  updateToShowInBadge(d: Map<Item, number>) {
    // the sum of all units
    this.quantities = [...d.values()].reduce((a, b) => a + b, 0);
  }

  goToCart() {
    this.router.navigate(['cart'], { relativeTo: this.route });
  }

}
