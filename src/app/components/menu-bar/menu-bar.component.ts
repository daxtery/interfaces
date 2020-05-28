import { Component } from '@angular/core';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DatabaseService } from 'src/app/services/database.service';
import { Category } from 'src/app/category';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

  categories: Category[];
  svgIconNames: Map<Category, string> = new Map<Category, string>();

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, database: DatabaseService) {
    const categories = database.categories;
    this.populateSVGIcons(categories);
    this.categories = categories;
  }

  nameFromCategory(category: Category) {
    let current = category;
    const parts: string[] = [current.name];
    while (current.parent) { current = current.parent; parts.push(current.name); }
    return parts.join('-');
  }

  populateSVGIcons(categories: Category[]) {
    for (const category of categories) {
      const uniqueName = this.nameFromCategory(category);
      this.svgIconNames.set(category, uniqueName);
      this.matIconRegistry.addSvgIcon(
        uniqueName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(category.imageURL)
      );
      if (category.children) {
        this.populateSVGIcons(category.children);
      }
    }
  }
}
