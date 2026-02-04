import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first, takeWhile, tap } from 'rxjs/operators';
import { YoungResult } from 'src/app/core/models/young';
import { CompanyService } from 'src/app/core/services/company.service';
import { YoungService } from 'src/app/core/services/young.service';
import { ColaborationTypeComponent } from '../dialogs/colaboration-type/colaboration-type.component';

@Component({
  selector: 'app-youth-resumes',
  templateUrl: './youth-resumes.component.html',
  styleUrls: ['./youth-resumes.component.scss'],
})
export class YouthResumesComponent implements OnInit {
  PAGE_INDEX = 0;
  PAGE_SIZE = 10;

  filterQuery;
  youth$: Observable<YoungResult>;
  private alive: boolean = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private youngService: YoungService,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.ListenToQueryParamsChange();

    this.setColaborationType();
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
    this.youth$ = this.youngService.findByCompany(page, limit, filterQuery);
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

  setColaborationType() {
    this.companyService
      .findCompanyByUser()
      .pipe(
        first(),
        tap((company) => {
          if (!company.colaboration_type)
            this.dialog.open(ColaborationTypeComponent);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
