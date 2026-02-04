import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { Data } from 'src/app/core/models/dropdown_data';
import { CompanyService } from 'src/app/core/services/company.service';

@Component({
    selector: 'app-colaboration-type',
    templateUrl: './colaboration-type.component.html',
    styleUrls: ['./colaboration-type.component.scss'],
    standalone: false
})
export class ColaborationTypeComponent implements OnInit {
  COLABORATION_FORM = this.fb.group({
    colaboration_type: [''],
  });

  DATA = Data.COLABORATION_TYPE;

  constructor(
    public dialogRef: MatDialogRef<ColaborationTypeComponent>,
    private fb: UntypedFormBuilder,
    private companyService: CompanyService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  submit() {
    this.companyService
      .setColaboration(this.COLABORATION_FORM.value)
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Merci !');
            this.dialogRef.close();
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
