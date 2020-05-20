import { Component, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
  @Output() setValue: EventEmitter<string> = new EventEmitter();

  private searchSubject: Subject<string> = new Subject();

  constructor() {
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
      this.setValue.emit(searchValue);
    });
  }

}
