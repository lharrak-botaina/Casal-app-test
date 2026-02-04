import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaxSizeValidator } from 'src/app/core/validators/file-validators';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { PhotoService } from 'src/app/core/helpers/photo.service';
import { AssociationService } from 'src/app/core/services/association.service';

@Component({
    selector: 'app-edit-association-photos',
    templateUrl: './edit-association-photos.component.html',
    styleUrls: ['./edit-association-photos.component.scss'],
    standalone: false
})
export class EditAssociationPhotosComponent implements OnInit {
  PHOTO_MAX_SIZE = 1024 * 1024; // 1Mb
  accept = '.png, .jpeg, .jpg';

  PHOTO_FORM = this.fb.group({
    photo: [
      '',
      [Validators.required, MaxSizeValidator(this.PHOTO_MAX_SIZE)],
    ],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditAssociationPhotosComponent>,
    private fb: UntypedFormBuilder,
    private associationService: AssociationService,
    private toastrService: ToastrService,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {}

  async editPhoto() {
    const base64photo = this.PHOTO_FORM.value.photo?._files
      ? await this.photoService.imageToBase64(this.PHOTO_FORM.value.photo?._files[0])
      : '';

    const payload = { photo: base64photo, description: this.data.description };
    this.associationService
      .editPhoto(this.data._id, payload)
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Photo Updated successfully');
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
