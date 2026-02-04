import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { YoungResult } from 'src/app/core/models/young';
import { YoungService } from 'src/app/core/services/young.service';

@Component({
  selector: 'app-list-young-admin',
  templateUrl: './list-young-admin.component.html',
  styleUrls: ['./list-young-admin.component.scss'],
})
export class ListYoungAdminComponent implements OnInit, OnDestroy {
  PAGE_INDEX = 0;
  PAGE_SIZE = 10;

  filterQuery;
  youth$: Observable<YoungResult>;
  private alive: boolean = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private youngService: YoungService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ListenToQueryParamsChange();
  }

  ngAfterViewInit(): void {
    this.paginator?.page
      .pipe(
        takeWhile(() => this.alive),
        tap(() =>
          this.loadYouth(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.filterQuery
          )
        )
      )
      .subscribe();
  }

  loadYouth(page, limit, filterQuery) {
    this.youth$ = this.youngService.findByAdmin(page, limit, filterQuery);
  }

  ListenToQueryParamsChange() {
    this.activatedRoute.queryParams
      .pipe(
        takeWhile(() => this.alive),
        tap((_) => (this.paginator ? (this.paginator.pageIndex = 0) : 0))
      )
      .subscribe((queryPrams) => {
        this.filterQuery = queryPrams;
        this.loadYouth(this.PAGE_INDEX, this.PAGE_SIZE, queryPrams);
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
