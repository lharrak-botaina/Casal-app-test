import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    standalone: false
})
export class YouthResumesComponent implements OnInit, OnDestroy {
  first = 0;
  pageSize = 10;

  filterQuery;
  youth$: Observable<YoungResult>;
  private alive: boolean = true;

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

  onPageChange(event: any) {
    this.first = event.first;
    this.pageSize = event.rows;
    const pageIndex = event.page;
    this.loadYouth(pageIndex, this.pageSize, this.filterQuery);
  }

  loadYouth(page, limit, filterQuery) {
    this.youth$ = this.youngService.findByCompany(page, limit, filterQuery);
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
