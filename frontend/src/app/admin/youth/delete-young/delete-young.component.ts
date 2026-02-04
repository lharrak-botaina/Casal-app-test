import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { YoungService } from 'src/app/core/services/young.service';

@Component({
  selector: 'app-delete-young',
  templateUrl: './delete-young.component.html',
  styleUrls: ['./delete-young.component.scss'],
})
export class DeleteYoungComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DeleteYoungComponent>,
    private youngService: YoungService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  remove() {
    this.youngService
      .remove(this.data._id)
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Jeune supprimé avec succès');
            this.dialogRef.close();
            this.router.navigate(['/casal/young']);
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
