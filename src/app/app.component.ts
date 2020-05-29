import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'interfaces';

  constructor(private database: DatabaseService, private router: Router){
  }

  goToBase(){
    this.router.navigate(['']);
    this.database.searchedInBox('');
  }

}
