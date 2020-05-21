import { Component, OnInit } from '@angular/core';
import { ItemViewService } from 'src/app/services/item-view.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Item } from 'src/app/item';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BrandSelect } from 'src/app/BrandSelect';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-filter-by-brand',
  templateUrl: './filter-by-brand.component.html',
  styleUrls: ['./filter-by-brand.component.css']
})
export class FilterByBrandComponent {

  brandsFromDatabase: string[] = [];
  selectedBrands: string[];

  constructor(database: DatabaseService, private service: ItemViewService) {
    database.currentItems.subscribe((items) => this.updateBrands(items));
  }

  updateBrands(items: Item[]) {
    this.brandsFromDatabase = [...new Set(items.map(item => item.brand))];
    this.changed(this.brandsFromDatabase);
  }

  changed(list: string[]) {
    this.selectedBrands = list;
    this.service.changedBrands(this.selectedBrands);
  }
}
