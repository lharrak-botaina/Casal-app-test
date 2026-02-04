import { FileValidator } from 'ngx-material-file-input';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YoungFormService } from 'src/app/core/helpers/young-form.service';
import { PhotoService } from 'src/app/core/helpers/photo.service';
import { YoungService } from 'src/app/core/services/young.service';
import { catchError, first, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-young',
  templateUrl: './add-young.component.html',
  styleUrls: ['./add-young.component.scss'],
})
export class AddYoungComponent implements OnInit {
  YONG_FORM: FormGroup;

  constructor(
    private fb: FormBuilder,
    private young: YoungFormService,
    private photoService: PhotoService,
    private youngService: YoungService,
    private toastr: ToastrService,
    private router : Router
  ) {
    this.YONG_FORM = this.fb.group({
      personal_info: this.young.PersonalInfoForm(),
      skills_assessment: this.young.skillsAssessmentForm(),
      capacity_building: this.young.capacityBuildingForm(),
      passwork: this.young.passworkForm(),
      insertion: this.young.insertionForm(),
    });
  }

  ngOnInit() {}

  async add() {
    await this.setYoungPhoto();
    await this.setInsertionJustifications();
    this.youngService
      .add(this.YONG_FORM.value)
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastr.success('Jeune ajouté avec succès');
            this.router.navigate(['/association/young']);
          },
        }),
        catchError((err) => {
          this.toastr.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }

  async setYoungPhoto() {
    this.YONG_FORM.value.personal_info.photo = await this.imageToBase64();
  }

  private async imageToBase64() {
    return !!this.YONG_FORM.value.personal_info.photo?._files
      ? await this.photoService.imageToBase64(
          this.YONG_FORM.value.personal_info.photo._files[0]
        )
      : '';
  }

  async setInsertionJustifications() {
    for (
      let index = 0;
      index < this.YONG_FORM.value.insertion.list.length;
      index++
    ) {
      this.YONG_FORM.value.insertion.list[
        index
      ].tracking_after.justification = await this.fileToBase64(index);
    }
  }

  private async fileToBase64(index) {
    return !!this.YONG_FORM.value.insertion.list[index].tracking_after.justification
      ?._files
      ? await this.photoService.pdfToBase64(
          this.YONG_FORM.value.insertion.list[index].tracking_after.justification
            ._files[0]
        )
      : '';
  }
}
