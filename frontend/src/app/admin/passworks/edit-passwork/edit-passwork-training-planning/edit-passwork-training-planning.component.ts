import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileValidator } from 'ngx-material-file-input';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { PhotoService } from 'src/app/core/helpers/photo.service';
import { PassworkService } from 'src/app/core/services/passwork.service';

@Component({
  selector: 'app-edit-passwork-training-planning',
  templateUrl: './edit-passwork-training-planning.component.html',
  styleUrls: ['./edit-passwork-training-planning.component.scss'],
})
export class EditPassworkTrainingPlanningComponent implements OnInit {
  FILE_MAX_SIZE = 1024 * 1024; // 1Mb
  accept = '.pdf';

  FILE_FORM = this.fb.group({
    training_planning: [
      '',
      [Validators.required, FileValidator.maxContentSize(this.FILE_MAX_SIZE)],
    ],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditPassworkTrainingPlanningComponent>,
    private fb: FormBuilder,
    private passworkService: PassworkService,
    private toastrService: ToastrService,
    private fileService: PhotoService
  ) {}

  ngOnInit(): void {}

  async editTrainingPlanning() {
    const training_planning = this.FILE_FORM.value.training_planning?._files
      ? await this.fileService.pdfToBase64(
          this.FILE_FORM.value.training_planning?._files[0]
        )
      : '';

    this.passworkService
      .editTrainingPlanning(this.data._id, { training_planning })
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Document modifié avec succès');
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
