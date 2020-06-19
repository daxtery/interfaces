import { Component, Input, OnInit } from '@angular/core';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DatabaseService } from 'src/app/services/database.service';
import { Category } from 'src/app/category';
import { Router } from '@angular/router';
import { SvgCategoryIconsDatabaseService } from 'src/app/services/svgIconsDatabase.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  categories: Category[];

  constructor(private database: DatabaseService,
              private router: Router,
              public svgIcons: SvgCategoryIconsDatabaseService) {
  }

  searchForCategory(category: Category) {
    this.database.searchedInMenu(category);
  }

  ngOnInit(): void {
    const categories = this.database.categories;
    this.categories = categories;
    this.svgIcons.populateSVGIcons(this.categories);
  }

  clickedTab(category: Category) {
    console.log('MenuBarComponent clicked', category);
    this.router.navigate(['']);
    this.database.searchedInMenu(category);
  }
}
