import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { IsPasswordMatchService } from 'src/app/core/helpers/is-password-match.service';
import { AssociationService } from 'src/app/core/services/association.service';

@Component({
    selector: 'app-edit-association-password',
    templateUrl: './edit-association-password.component.html',
    styleUrls: ['./edit-association-password.component.scss'],
    standalone: false
})
export class EditAssociationPasswordComponent implements OnInit {
  PASSWORD_FORM = this.fb.group(
    {
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeat_password: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validators: this.isPasswordMatch.checkPasswords }
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditAssociationPasswordComponent>,
    private fb: UntypedFormBuilder,
    private isPasswordMatch: IsPasswordMatchService,
    private associationService : AssociationService,
    private toastrService : ToastrService
  ) {}

  ngOnInit(): void {}

  editPassword() {
    this.associationService
      .editPassword(this.data._id, {password : this.PASSWORD_FORM.value.password})
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
