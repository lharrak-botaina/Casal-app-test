import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileValidator } from 'ngx-material-file-input';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { PhotoService } from 'src/app/core/helpers/photo.service';
import { YoungService } from 'src/app/core/services/young.service';

@Component({
  selector: 'app-edit-young-justification-dialog',
  templateUrl: './edit-young-justification-dialog.component.html',
  styleUrls: ['./edit-young-justification-dialog.component.scss'],
})
export class EditYoungJustificationDialogComponent implements OnInit {
  PHOTO_MAX_SIZE = 1024 * 1024; // 1Mb

  FILE_FORM = this.fb.group({
    file: [
      '',
      [Validators.required, FileValidator.maxContentSize(this.PHOTO_MAX_SIZE)],
    ],
    index : [0, Validators.required]
  });

  isValidToInsertion : boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditYoungJustificationDialogComponent>,
    private fb: FormBuilder,
    private youngService: YoungService,
    private toastrService: ToastrService,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
   this.isValid(this.data.formControl?.value)
  }

  async editJustification() {
    if(!this.isValidToInsertion) return;

    const base64pdf = this.FILE_FORM.value.file?._files
      ? await this.photoService.pdfToBase64(
          this.FILE_FORM.value.file?._files[0]
        )
      : '';

    const payload = { file: base64pdf, index: this.data.index };
    this.youngService
      .editJustification(this.data._id, payload)
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Justification modifiée avec success');
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

  isValid(form){
    if( form.category && form.contract_type && form.function_type && form.insertion_type && form.duration && form.salary && form.justificative_type)
      this.isValidToInsertion = true
  }
}
