import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ItemViewService } from 'src/app/services/item-view.service';
import { ItemAndStock } from 'src/app/ItemAndStock';

@Component({
  selector: 'app-order-by',
  templateUrl: './order-by.component.html',
  styleUrls: ['./order-by.component.css']
})
export class OrderByComponent {

  orders: string[] = [];

  ascendingOrder: Map<string, boolean> = new Map<string, boolean>();

  orderMappings = new Map<string, (a: ItemAndStock) => number>();

  constructor(private service: ItemViewService) {

    this.orderMappings.set('popularity', (i) => i.clicks);
    this.orderMappings.set('unit price', (i) => i.unitaryPrice);
    this.orderMappings.set('price per kg/l', (i) => i.pricePerWeight);
    this.orderMappings.set('quantity kg/l', (i) => i.weightInStandardUnit);

    this.orders = Array.from(this.orderMappings.keys());

    for (const order of this.orders) {
      this.ascendingOrder.set(order, false);
    }

    this.service.changedOrders(this.orders, this.ascendingOrder, this.orderMappings);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.orders, event.previousIndex, event.currentIndex);
    this.service.changedOrders(this.orders, this.ascendingOrder, this.orderMappings);
  }

  clicked(order: string) {
    this.ascendingOrder.set(order, !this.ascendingOrder.get(order));
    this.service.changedOrders(this.orders, this.ascendingOrder, this.orderMappings);
  }

}
