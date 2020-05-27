import { Component, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnDestroy {
  @Input() readonly placeholder: string = '';

  search: string;

  constructor(private service: DatabaseService) {
  }

  ngOnDestroy() {
  }

  public updateSearch() {
    this.service.searchedInBox(this.search);
  }

}
