import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { PassworkResult } from 'src/app/core/models/passwork';
import { PassworkService } from 'src/app/core/services/passwork.service';

@Component({
    selector: 'app-list-passwork',
    templateUrl: './list-passwork.component.html',
    styleUrls: ['./list-passwork.component.scss'],
    standalone: false
})
export class ListPassworkComponent implements OnInit, OnDestroy {
  first = 0;
  pageSize = 10;

  filterQuery;
  passwork$: Observable<PassworkResult>;
  private alive: boolean = true;

  constructor(
    private passworkService: PassworkService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ListenToQueryParamsChange();
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.pageSize = event.rows;
    const pageIndex = event.page;
    this.loadPassworks(pageIndex, this.pageSize, this.filterQuery);
  }

  loadPassworks(page, limit, filterQuery) {
    this.passwork$ = this.passworkService.find(page, limit, filterQuery);
  }

  ListenToQueryParamsChange() {
    this.activatedRoute.queryParams
      .pipe(
        takeWhile(() => this.alive),
        tap((_) => (this.first = 0))
      )
      .subscribe((queryPrams) => {
        this.filterQuery = queryPrams;
        this.loadPassworks(0, this.pageSize, queryPrams);
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
