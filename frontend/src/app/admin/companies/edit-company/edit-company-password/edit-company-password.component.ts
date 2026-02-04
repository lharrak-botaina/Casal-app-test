import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { IsPasswordMatchService } from 'src/app/core/helpers/is-password-match.service';
import { CompanyService } from 'src/app/core/services/company.service';

@Component({
    selector: 'app-edit-company-password',
    templateUrl: './edit-company-password.component.html',
    styleUrls: ['./edit-company-password.component.scss'],
    standalone: false
})
export class EditCompanyPasswordComponent implements OnInit {
  PASSWORD_FORM = this.fb.group(
    {
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeat_password: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validators: this.isPasswordMatch.checkPasswords }
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditCompanyPasswordComponent>,
    private fb: UntypedFormBuilder,
    private isPasswordMatch: IsPasswordMatchService,
    private companyService: CompanyService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  editPassword() {
    this.companyService
      .editPassword(this.data._id, {
        password: this.PASSWORD_FORM.value.password,
      })
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Password Modifié avec succès');
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
