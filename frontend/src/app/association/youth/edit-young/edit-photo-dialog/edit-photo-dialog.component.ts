import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaxSizeValidator } from 'src/app/core/validators/file-validators';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { PhotoService } from 'src/app/core/helpers/photo.service';
import { YoungService } from 'src/app/core/services/young.service';

@Component({
    selector: 'app-edit-photo-dialog',
    templateUrl: './edit-photo-dialog.component.html',
    styleUrls: ['./edit-photo-dialog.component.scss'],
    standalone: false
})
export class EditPhotoDialogComponent implements OnInit {
  PHOTO_MAX_SIZE = 1024 * 1024; // 1Mb

  PHOTO_FORM = this.fb.group({
    photo: [
      '',
      [Validators.required, MaxSizeValidator(this.PHOTO_MAX_SIZE)],
    ],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditPhotoDialogComponent>,
    private fb: UntypedFormBuilder,
    private youngService: YoungService,
    private toastrService: ToastrService,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {}

  async editPhoto() {
    const base64photo = this.PHOTO_FORM.value.photo?._files
      ? await this.photoService.imageToBase64(
          this.PHOTO_FORM.value.photo?._files[0]
        )
      : '';

    const payload = { photo: base64photo };
    this.youngService
      .editPhoto(this.data._id, payload)
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Photo modifiée avec success');
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
