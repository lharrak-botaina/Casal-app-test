import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { JobService } from 'src/app/core/services/job.service';

@Component({
  selector: 'app-archive-job',
  templateUrl: './archive-job.component.html',
  styleUrls: ['./archive-job.component.scss'],
})
export class ArchiveJobComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ArchiveJobComponent>,
    private jobService: JobService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  archive() {
    const status = 'inactive';

    this.jobService
      .archive(this.data._id, { status })
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Offre d\'emploi archivée avec succès');
            this.dialogRef.close();
            this.router.navigate(['/casal/job'], { queryParams : { status : 'active' }} );
          },
        }),
        catchError((err) => {
          this.toastrService.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }
}
