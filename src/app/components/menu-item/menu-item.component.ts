import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/category';
import { SvgCategoryIconsDatabaseService } from 'src/app/services/svgIconsDatabase.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {
  @Input() items: Category[];
  @Input() parent: Category;
  @ViewChild('childMenu', { static: true }) public childMenu;

  constructor(public router: Router, private database: DatabaseService, public svgIcons: SvgCategoryIconsDatabaseService) {
  }

  clicked(category: Category) {
    console.log('MenuItemComponent clicked', category);
    this.router.navigate(['']);
    this.database.searchedInMenu(category);
  }

}
