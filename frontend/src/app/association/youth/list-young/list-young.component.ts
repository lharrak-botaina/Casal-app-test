import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { YoungResult } from 'src/app/core/models/young';
import { YoungService } from 'src/app/core/services/young.service';

@Component({
    selector: 'app-list-young',
    templateUrl: './list-young.component.html',
    styleUrls: ['./list-young.component.scss'],
    standalone: false
})
export class ListYoungComponent implements OnInit, OnDestroy {
  first = 0;
  pageSize = 10;

  filterQuery;
  youth$: Observable<YoungResult>;
  private alive: boolean = true;

  constructor(
    private youngService: YoungService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ListenToQueryParamsChange();
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.pageSize = event.rows;
    const pageIndex = event.page;
    this.loadYouth(pageIndex, this.pageSize, this.filterQuery);
  }

  loadYouth(page, limit, filterQuery) {
    this.youth$ = this.youngService.find(page, limit, filterQuery);
  }

  ListenToQueryParamsChange() {
    this.activatedRoute.queryParams
      .pipe(
        takeWhile(() => this.alive),
        tap((_) => (this.first = 0))
      )
      .subscribe((queryPrams) => {
        this.filterQuery = queryPrams;
        this.loadYouth(0, this.pageSize, queryPrams);
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
