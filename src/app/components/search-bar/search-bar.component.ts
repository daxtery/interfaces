import { Component, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-search-bar',
  template: `
  <input
    type="text"
    [placeholder]="placeholder"
    (keyup)="updateSearch($event.target.value)"
  />`,
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnDestroy {
  @Input() readonly placeholder: string = '';
  @Input() readonly debounceTimer: number = 500;

  private searchSubject: Subject<string> = new Subject();

  constructor(private service: DatabaseService) {
    this.setSearchSubscription();
  }

  ngOnDestroy() {
    this.searchSubject.unsubscribe();
  }

  public updateSearch(searchTextValue: string) {
    this.searchSubject.next(searchTextValue);
  }

  private setSearchSubscription() {
    this.searchSubject.pipe(
      debounceTime(this.debounceTimer)
    ).subscribe((searchValue: string) => {
      this.service.searchedInBox(searchValue);
    });
  }

}
