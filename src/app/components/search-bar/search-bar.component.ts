import { Component, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent {
  @Input() readonly placeholder: string = '';

  search: string;

  constructor(private service: DatabaseService, private route: ActivatedRoute, private router: Router) {
  }

  public updateSearch() {
    this.router.navigate(['']);
    this.service.searchedInBox(this.search);
  }

}
