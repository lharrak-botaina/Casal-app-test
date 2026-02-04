import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileValidator } from 'ngx-material-file-input';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { PhotoService } from 'src/app/core/helpers/photo.service';
import { ActivityArea } from 'src/app/core/models/activity_area';
import { AssociationResult } from 'src/app/core/models/association';
import { CompanyResult } from 'src/app/core/models/company';
import { Data } from 'src/app/core/models/dropdown_data';
import { AssociationService } from 'src/app/core/services/association.service';
import { CompanyService } from 'src/app/core/services/company.service';
import { PassworkService } from 'src/app/core/services/passwork.service';

@Component({
  selector: 'app-add-passwork',
  templateUrl: './add-passwork.component.html',
  styleUrls: ['./add-passwork.component.scss'],
})
export class AddPassworkComponent implements OnInit {
  FILE_MAX_SIZE = 1024 * 1024; // 1Mb

  associations$: Observable<AssociationResult>;
  companies$: Observable<CompanyResult>;
  PASSWORK_MODULES = Data.PASSWORK_MODULES;

  TRAINING_CENTER_FORM = this.fb.group({
    name: [''],
    address: [''],
    phone: [''],
    email: ['', [Validators.email]],
  });

  PASSWORK_FORM = this.fb.group({
    title: ['', [Validators.required]],
    module: [''],
    associations: [[]],
    company: [null],
    training_center: this.TRAINING_CENTER_FORM,
    nbr_beneficiaries: [0],
    start_date: [''],
    end_date: [''],
    training_modules: [''],
    training_planning: ['', FileValidator.maxContentSize(this.FILE_MAX_SIZE)],
  });

  @ViewChild('form') form: FormGroupDirective;

  constructor(
    private fb: FormBuilder,
    private passworkService: PassworkService,
    private associationService: AssociationService,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private photoService: PhotoService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.associations$ = this.associationService.find(0, 1000, '');
    this.companies$ = this.companyService.find(0, 1000, '');
  }

  async add() {
    this.PASSWORK_FORM.value.training_modules = await this.pdfToBase64(
      this.PASSWORK_FORM.value.training_modules
    );
    this.PASSWORK_FORM.value.training_planning = await this.pdfToBase64(
      this.PASSWORK_FORM.value.training_planning
    );

    this.passworkService
      .add({
        ...this.PASSWORK_FORM.value,
      })
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Passwork ajouté avec succès');
            this.router.navigate(['/casal/passwork'], {queryParams : { status : 'active'}})
          },
        }),
        catchError((err) => {
          this.toastrService.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }

  private async pdfToBase64(pdfInput) {
    if(!!pdfInput?._files) 
      return await this.photoService.pdfToBase64(pdfInput._files[0])
  }
}
