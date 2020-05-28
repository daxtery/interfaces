import { Component } from '@angular/core';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private database: DatabaseService) {
    this.matIconRegistry.addSvgIcon(
      'all_of_me',
      // https://www.flaticon.com/free-icon/move_918738?term=all&page=1&position=1
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/all.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'pizza',
      // https://www.flaticon.com/free-icon/pizza_2916070?term=pizza&page=1&position=14
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/pizza.svg')
    );

    console.log(this.database.categories);
  }
}
