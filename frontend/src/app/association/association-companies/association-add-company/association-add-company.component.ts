import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaxSizeValidator } from 'src/app/core/validators/file-validators';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { IsPasswordMatchService } from 'src/app/core/helpers/is-password-match.service';
import { PhotoService } from 'src/app/core/helpers/photo.service';
import { ActivityArea } from 'src/app/core/models/activity_area';
import { Data } from 'src/app/core/models/dropdown_data';
import { CompanyService } from 'src/app/core/services/company.service';

@Component({
    selector: 'app-association-add-company',
    templateUrl: './association-add-company.component.html',
    styleUrls: ['./association-add-company.component.scss'],
    standalone: false
})
export class AssociationAddCompanyComponent implements OnInit {
  PHOTO_MAX_SIZE = 1024 * 1024; // 1Mb
  accept = '.png, .jpeg, .jpg';

  CITIES = Data.CITIES;
  ACTIVITY_AREA = ActivityArea.List;

  SOCIAL_MEDIA_FORM = this.fb.group({
    facebook: [''],
    twitter: [''],
    instagram: [''],
    linkedIn: [''],
  });

  PERSON_FORM = this.fb.group({
    fullname: ['', [Validators.required]],
    email: ['', [Validators.required, , Validators.email]],
    phone: ['', [Validators.required]],
  });

  COMPANY_FORM = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    address: [''],
    city: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeat_password: ['', [Validators.required, Validators.minLength(6)]],
    logo: ['', MaxSizeValidator(this.PHOTO_MAX_SIZE)],
    activity_area: ['', [Validators.required]],
    person_contacted: this.PERSON_FORM,
    socialMedia: this.SOCIAL_MEDIA_FORM,
  },
  { validators: this.isPasswordMatch.checkPasswords });

  @ViewChild('form') form: FormGroupDirective;

  constructor(
    private fb: UntypedFormBuilder,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private router: Router,
    private isPasswordMatch: IsPasswordMatchService,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {}

  async add() {
    const logo = !!this.COMPANY_FORM.value.logo?._files
    ? await this.photoService.imageToBase64(this.COMPANY_FORM.value.logo._files[0])
    : '';

    this.companyService
      .addByAssociation({
        ...this.COMPANY_FORM.value,
        logo
      })
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Entreprise ajoutée avec succès');
            this.router.navigate(['/association/companies']);
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
