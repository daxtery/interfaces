import { Component, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemViewService } from 'src/app/services/item-view.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent {
  @Input() readonly placeholder: string = '';

  search: string;

  constructor(private service: SearchService, private router: Router) {
    // This is not cool, but it works...
    service.currentSearch.subscribe(s => this.search = s);
  }

  public updateSearch() {
    this.router.navigate(['']);
    this.service.search(this.search);
  }

}
