import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { JobResult } from 'src/app/core/models/job';
import { JobService } from 'src/app/core/services/job.service';
import { takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-association-jobs',
  templateUrl: './association-jobs.component.html',
  styleUrls: ['./association-jobs.component.scss']
})
export class AssociationJobsComponent implements OnInit {
  PAGE_INDEX = 0;
  PAGE_SIZE = 10;

  filterQuery;
  jobs$: Observable<JobResult>;
  private alive: boolean = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs(this.PAGE_INDEX, this.PAGE_SIZE);
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

  loadJobs(page, limit, filterQuery?) {
    this.jobs$ = this.jobService.findByAssociation(page, limit, filterQuery);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
