import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-order-by',
  templateUrl: './order-by.component.html',
  styleUrls: ['./order-by.component.css']
})
export class OrderByComponent implements OnInit {

  orders = [
    'popularity',
    'unit price',
    'price per kg/l',
    'quantity kg/l'
  ];

  ascOrDescOrder: Map<string, boolean> = new Map<string, boolean>();

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.orders, event.previousIndex, event.currentIndex);
  }

  constructor() {
    for (const order of this.orders) {
      this.ascOrDescOrder.set(order, false);
    }
  }

  ngOnInit() {
  }

  sortData(thingy) {
    console.log('Callback of sortData', thingy);
  }

  clicked(order: string) {
    this.ascOrDescOrder.set(order, !this.ascOrDescOrder.get(order));
  }

}
