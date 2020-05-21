import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../category';

@Injectable({
  providedIn: 'root'
})
export class ItemViewService {

  private brandsSource = new BehaviorSubject<string[]>([]);
  currentBrands = this.brandsSource.asObservable();

  private categoriesSource = new BehaviorSubject<Category[]>([]);
  currentCategories = this.categoriesSource.asObservable();

  constructor() {

  }

  changedBrands(allowed: string[]): void {
    console.log('New allowed are:', allowed);
    this.brandsSource.next(allowed);
  }

  changedCategories(allowed: Category[]): void {
    this.categoriesSource.next(allowed);
  }
}
