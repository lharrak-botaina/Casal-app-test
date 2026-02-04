import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { first, tap, catchError } from 'rxjs/operators';
import { AssociationService } from 'src/app/core/services/association.service';

@Component({
    selector: 'app-delete-association',
    templateUrl: './delete-association.component.html',
    styleUrls: ['./delete-association.component.scss'],
    standalone: false
})
export class DeleteAssociationComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DeleteAssociationComponent>,
    private associationService: AssociationService,
    private toastrService: ToastrService,
    private router : Router
  ) {}

  ngOnInit(): void {}

  remove() {
    this.associationService
      .remove(this.data._id)
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Association Supprimée avec succès');
            this.dialogRef.close();
            this.router.navigate(['/casal/association']);
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
