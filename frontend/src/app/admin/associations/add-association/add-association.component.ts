import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { AssociationService } from 'src/app/core/services/association.service';
import { catchError, first, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FileValidator } from 'ngx-material-file-input';
import { Data } from 'src/app/core/models/dropdown_data';
import { IsPasswordMatchService } from 'src/app/core/helpers/is-password-match.service';
import { PhotoService } from 'src/app/core/helpers/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-association',
  templateUrl: './add-association.component.html',
  styleUrls: ['./add-association.component.scss'],
})
export class AddAssociationComponent implements OnInit {
  PHOTO_MAX_SIZE = 1024 * 1024; // 1Mb
  accept = '.png, .jpeg, .jpg';
  public maxDate = new Date();

  CITIES = Data.CITIES;

  SOCIAL_MEDIA_FORM = this.fb.group({
    facebook: [''],
    twitter: [''],
    instagram: [''],
    linkedIn: [''],
  });

  TIP_FORM = this.fb.group({
    fullname: ['', [Validators.required]],
    email: ['', [Validators.required, , Validators.email]],
    phone: ['', [Validators.required]],
    photo: ['', FileValidator.maxContentSize(this.PHOTO_MAX_SIZE)],
  });

  ASSOCIATION_FORM = this.fb.group(
    {
      raisonSocial: ['', [Validators.required, Validators.minLength(1)]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeat_password: ['', [Validators.required, Validators.minLength(6)]],
      address: [''],
      city: ['', Validators.required],
      webSite: [''],
      socialMedia: this.SOCIAL_MEDIA_FORM,
      description: [''],
      logo: ['', FileValidator.maxContentSize(this.PHOTO_MAX_SIZE)],
      tip: this.TIP_FORM,
      collaborationDate: [''],
      creationDate: [''],
    },
    { validators: this.isPasswordMatch.checkPasswords }
  );

  @ViewChild('form') form: FormGroupDirective;

  constructor(
    private fb: FormBuilder,
    private associationService: AssociationService,
    private toastrService: ToastrService,
    private isPasswordMatch : IsPasswordMatchService,
    private photoService : PhotoService,
    private router : Router
  ) {}

  ngOnInit(): void {}

  async add() {
    const logo = !!this.ASSOCIATION_FORM.value.logo?._files
      ? await this.photoService.imageToBase64(this.ASSOCIATION_FORM.value.logo._files[0])
      : '';
    const tipPhoto = !!this.ASSOCIATION_FORM.value.tip.photo?._files
      ? await this.photoService.imageToBase64(
          this.ASSOCIATION_FORM.value.tip.photo._files[0]
        )
      : '';

    this.associationService
      .add({
        ...this.ASSOCIATION_FORM.value,
        logo,
        tip: {
          ...this.ASSOCIATION_FORM.value.tip,
          photo: tipPhoto,
        },
      })
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Association ajoutée avec succès');
            this.router.navigate(['/casal/association']);
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
