import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaxSizeValidator } from 'src/app/core/validators/file-validators';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { PhotoService } from 'src/app/core/helpers/photo.service';
import { PassworkService } from 'src/app/core/services/passwork.service';
import { EditPassworkTrainingPlanningComponent } from '../edit-passwork-training-planning/edit-passwork-training-planning.component';

@Component({
    selector: 'app-edit-passwork-training-modules',
    templateUrl: './edit-passwork-training-modules.component.html',
    styleUrls: ['./edit-passwork-training-modules.component.scss'],
    standalone: false
})
export class EditPassworkTrainingModulesComponent implements OnInit {
  FILE_MAX_SIZE = 1024 * 1024; // 1Mb
  accept = '.pdf';

  FILE_FORM = this.fb.group({
    training_modules: [
      '',
      [Validators.required, MaxSizeValidator(this.FILE_MAX_SIZE)],
    ],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditPassworkTrainingPlanningComponent>,
    private fb: UntypedFormBuilder,
    private passworkService: PassworkService,
    private toastrService: ToastrService,
    private fileService: PhotoService
  ) {}

  ngOnInit(): void {}

  async editTrainingModules() {
    const training_modules = this.FILE_FORM.value.training_modules?._files
      ? await this.fileService.pdfToBase64(
          this.FILE_FORM.value.training_modules?._files[0]
        )
      : '';

    this.passworkService
      .editTrainingModules(this.data._id, { training_modules })
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
