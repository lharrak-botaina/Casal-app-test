import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Job } from 'src/app/core/models/job';
import { JobService } from 'src/app/core/services/job.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { first, tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AssociationArchiveJobComponent } from '../association-archive-job/association-archive-job.component';

@Component({
    selector: 'app-association-jobs-details',
    templateUrl: './association-jobs-details.component.html',
    styleUrls: ['./association-jobs-details.component.scss'],
    standalone: false
})
export class AssociationJobsDetailsComponent implements OnInit {
  job: Job = !window?.history?.state?._id ? null : window?.history?.state;
  isSmallScreen: boolean;
  isOwner: boolean = false;
  private currentUserId: string;

  constructor(
    private jobService: JobService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.authService.user$.pipe(first()).subscribe(user => {
      this.currentUserId = user?._id;
      this.checkOwnership();
    });

    if (!this.job)
      this.loadJob(this.activatedRoute?.snapshot?.paramMap?.get('id'));
    else
      this.checkOwnership();
  }

  loadJob(id) {
    this.jobService
      .findOneByAssociation(id)
      .pipe(
        first(),
        tap({
          next: (job) => {
            this.job = job;
            this.checkOwnership();
          },
        }),
        catchError((err) => {
          this.toastrService.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }

  archive() {
    this.dialog.open(AssociationArchiveJobComponent, {
      data: {
        _id: this.job._id,
      }
    });
  }

  private checkOwnership() {
    if (this.job && this.currentUserId) {
      this.isOwner = this.job.createdBy === this.currentUserId;
    }
  }
}
