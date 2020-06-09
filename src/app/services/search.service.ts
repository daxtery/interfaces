import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchSource: BehaviorSubject<string> = new BehaviorSubject<string>('');
  currentSearch: Observable<string> = this.searchSource.asObservable();

  constructor(private data: DatabaseService) { }

  public search(query: string) {
    this.data.searchedInBox(query);
    this.searchSource.next(query);
  }

  public clear() {
    this.searchSource.next('');
  }

}
