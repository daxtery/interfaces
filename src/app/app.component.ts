import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'interfaces';

  public filterResults(query: string): void {
    console.log(`Searching in database for ${query}`);
  }
}
