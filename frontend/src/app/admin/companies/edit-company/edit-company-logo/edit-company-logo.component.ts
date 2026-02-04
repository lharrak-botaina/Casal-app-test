import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileValidator } from 'ngx-material-file-input';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { PhotoService } from 'src/app/core/helpers/photo.service';
import { CompanyService } from 'src/app/core/services/company.service';

@Component({
  selector: 'app-edit-company-logo',
  templateUrl: './edit-company-logo.component.html',
  styleUrls: ['./edit-company-logo.component.scss'],
})
export class EditCompanyLogoComponent implements OnInit {
  PHOTO_MAX_SIZE = 1024 * 1024; // 1Mb
  accept = '.png, .jpeg, .jpg';

  PHOTO_FORM = this.fb.group({
    logo: [
      '',
      [Validators.required, FileValidator.maxContentSize(this.PHOTO_MAX_SIZE)],
    ],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditCompanyLogoComponent>,
    private fb: FormBuilder,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {}

  async editPhoto() {
    const base64photo = this.PHOTO_FORM.value.logo?._files
      ? await this.photoService.imageToBase64(
          this.PHOTO_FORM.value.logo?._files[0]
        )
      : '';

    const payload = { logo: base64photo };
    this.companyService
      .editLogo(this.data._id, payload)
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Logo Updated successfully');
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
