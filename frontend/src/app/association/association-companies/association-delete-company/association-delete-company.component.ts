import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { CompanyService } from 'src/app/core/services/company.service';

@Component({
    selector: 'app-association-delete-company',
    templateUrl: './association-delete-company.component.html',
    styleUrls: ['./association-delete-company.component.scss'],
    standalone: false
})
export class AssociationDeleteCompanyComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AssociationDeleteCompanyComponent>,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  remove() {
    this.companyService
      .removeByAssociation(this.data._id)
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Entreprise supprimée avec succès');
            this.dialogRef.close();
            this.router.navigate(['/association/companies']);
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
