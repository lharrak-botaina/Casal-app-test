import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { PassworkResult } from 'src/app/core/models/passwork';
import { PassworkService } from 'src/app/core/services/passwork.service';

@Component({
  selector: 'app-list-passwork',
  templateUrl: './list-passwork.component.html',
  styleUrls: ['./list-passwork.component.scss'],
})
export class ListPassworkComponent implements OnInit, OnDestroy {
  PAGE_INDEX = 0;
  PAGE_SIZE = 10;

  filterQuery;
  passwork$: Observable<PassworkResult>;
  private alive: boolean = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private passworkService: PassworkService,
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
          this.loadAssociations(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.filterQuery
          )
        )
      )
      .subscribe();
  }

  loadAssociations(page, limit, filterQuery) {
    this.passwork$ = this.passworkService.find(page, limit, filterQuery);
  }

  ListenToQueryParamsChange() {
    this.activatedRoute.queryParams
      .pipe(
        takeWhile(() => this.alive),
        tap((_) => (this.paginator ? (this.paginator.pageIndex = 0) : 0))
      )
      .subscribe((queryPrams) => {
        this.filterQuery = queryPrams;
        this.loadAssociations(this.PAGE_INDEX, this.PAGE_SIZE, queryPrams);
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
