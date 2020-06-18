import { Injectable } from '@angular/core';
import { Category } from '../category';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SvgCategoryIconsDatabaseService {

  svgIconNames: Map<Category, string> = new Map<Category, string>();

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) { }


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
