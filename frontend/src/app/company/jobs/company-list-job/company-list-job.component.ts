import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { JobResult } from 'src/app/core/models/job';
import { JobService } from 'src/app/core/services/job.service';

@Component({
  selector: 'app-company-list-job',
  templateUrl: './company-list-job.component.html',
  styleUrls: ['./company-list-job.component.scss']
})
export class CompanyListJobComponent implements OnInit, OnDestroy {
  PAGE_INDEX = 0;
  PAGE_SIZE = 10;

  filterQuery;
  jobs$: Observable<JobResult>;
  private alive: boolean = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private jobService: JobService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.ListenToQueryParamsChange();
  }

  ngAfterViewInit(): void {
    this.paginator?.page
      .pipe(
        takeWhile(() => this.alive),
        tap(() =>
          this.loadJobs(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.filterQuery
          )
        )
      )
      .subscribe();
  }

  loadJobs(page, limit, filterQuery) {
    this.jobs$ = this.jobService.findByCompany(page, limit, filterQuery);
  }

  ListenToQueryParamsChange() {
    this.activatedRoute.queryParams
      .pipe(
        takeWhile(() => this.alive),
        tap((_) => (this.paginator ? (this.paginator.pageIndex = 0) : 0))
      )
      .subscribe((queryPrams) => {
        this.filterQuery = queryPrams;
        this.loadJobs(this.PAGE_INDEX, this.PAGE_SIZE, queryPrams);
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
