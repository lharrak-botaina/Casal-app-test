import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Job } from 'src/app/core/models/job';
import { JobService } from 'src/app/core/services/job.service';
import { first, tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-association-jobs-details',
  templateUrl: './association-jobs-details.component.html',
  styleUrls: ['./association-jobs-details.component.scss'],
})
export class AssociationJobsDetailsComponent implements OnInit {
  job: Job = !window?.history?.state?._id ? null : window?.history?.state;
  isSmallScreen: boolean;

  constructor(
    private jobService: JobService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    if (!this.job)
      this.loadJob(this.activatedRoute?.snapshot?.paramMap?.get('id'));
  }

  loadJob(id) {
    this.jobService
      .findOneByAssociation(id)
      .pipe(
        first(),
        tap({
          next: (job) => (this.job = job),
        }),
        catchError((err) => {
          this.toastrService.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }
}
