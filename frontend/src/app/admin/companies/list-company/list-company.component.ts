import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { CompanyResult } from 'src/app/core/models/company';
import { CompanyService } from 'src/app/core/services/company.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.scss'],
})
export class ListCompanyComponent implements OnInit, OnDestroy {
  PAGE_INDEX = 0;
  PAGE_SIZE = 10;

  filterQuery;
  companies$: Observable<CompanyResult>;
  endpoint = environment.COMPANY_LOGO_HOST;

  private alive: boolean = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private companyService: CompanyService,
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
    this.companies$ = this.companyService.find(page, limit, filterQuery);
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
