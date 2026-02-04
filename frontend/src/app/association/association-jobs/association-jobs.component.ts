import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { JobResult } from 'src/app/core/models/job';
import { JobService } from 'src/app/core/services/job.service';

@Component({
    selector: 'app-association-jobs',
    templateUrl: './association-jobs.component.html',
    styleUrls: ['./association-jobs.component.scss'],
    standalone: false
})
export class AssociationJobsComponent implements OnInit, OnDestroy {
  first = 0;
  pageSize = 10;

  filterQuery;
  jobs$: Observable<JobResult>;
  private alive: boolean = true;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs(0, this.pageSize);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.pageSize = event.rows;
    const pageIndex = event.page;
    this.loadJobs(pageIndex, this.pageSize, this.filterQuery);
  }

  loadJobs(page, limit, filterQuery?) {
    this.jobs$ = this.jobService.findByAssociation(page, limit, filterQuery);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
