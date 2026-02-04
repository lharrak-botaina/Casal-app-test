import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { Job } from 'src/app/core/models/job';
import { JobService } from 'src/app/core/services/job.service';
import { CompanyArchiveJobComponent } from '../company-archive-job/company-archive-job.component';

@Component({
  selector: 'app-company-detail-job',
  templateUrl: './company-detail-job.component.html',
  styleUrls: ['./company-detail-job.component.scss'],
})
export class CompanyDetailJobComponent implements OnInit {
  job: Job = !window?.history?.state?._id ? null : window?.history?.state;
  private alive: boolean = true;
  isSmallScreen: boolean;

  constructor(
    private jobService: JobService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (!this.job)
      this.loadJob(this.activatedRoute?.snapshot?.paramMap?.get('id'));
  }

  loadJob(id) {
    this.jobService
      .findOneByCompany(id)
      .pipe(
        first(),
        tap({
          next: (association) => (this.job = association),
        }),
        catchError((err) => {
          this.toastrService.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }

  archive() {
    this.dialog.open(CompanyArchiveJobComponent, {
      data: {
        _id: this.job._id,
      },
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
