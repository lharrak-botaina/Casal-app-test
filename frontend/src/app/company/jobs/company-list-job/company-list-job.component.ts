import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { JobResult } from 'src/app/core/models/job';
import { JobService } from 'src/app/core/services/job.service';

@Component({
    selector: 'app-company-list-job',
    templateUrl: './company-list-job.component.html',
    styleUrls: ['./company-list-job.component.scss'],
    standalone: false
})
export class CompanyListJobComponent implements OnInit, OnDestroy {
  first = 0;
  pageSize = 10;

  filterQuery;
  jobs$: Observable<JobResult>;
  private alive: boolean = true;

  constructor(private jobService: JobService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.ListenToQueryParamsChange();
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.pageSize = event.rows;
    const pageIndex = event.page;
    this.loadJobs(pageIndex, this.pageSize, this.filterQuery);
  }

  loadJobs(page, limit, filterQuery) {
    this.jobs$ = this.jobService.findByCompany(page, limit, filterQuery);
  }

  ListenToQueryParamsChange() {
    this.activatedRoute.queryParams
      .pipe(
        takeWhile(() => this.alive),
        tap((_) => (this.first = 0))
      )
      .subscribe((queryPrams) => {
        this.filterQuery = queryPrams;
        this.loadJobs(0, this.pageSize, queryPrams);
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
