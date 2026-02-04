import { EditCompanyPasswordComponent } from './edit-company-password/edit-company-password.component';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { ActivityArea } from 'src/app/core/models/activity_area';
import { Data } from 'src/app/core/models/dropdown_data';
import { Company } from 'src/app/core/models/company';
import { CompanyService } from 'src/app/core/services/company.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCompanyLogoComponent } from './edit-company-logo/edit-company-logo.component';

@Component({
    selector: 'app-edit-company',
    templateUrl: './edit-company.component.html',
    styleUrls: ['./edit-company.component.scss'],
    standalone: false
})
export class EditCompanyComponent implements OnInit {
  company: Company = !window?.history?.state?._id
    ? null
    : window?.history?.state;

  currentId;

  CITIES = Data.CITIES;
  ACTIVITY_AREA = ActivityArea.List;

  SOCIAL_MEDIA_FORM = this.fb.group({
    facebook: [this.company?.socialMedia?.facebook],
    twitter: [this.company?.socialMedia?.twitter],
    instagram: [this.company?.socialMedia?.instagram],
    linkedIn: [this.company?.socialMedia?.linkedIn],
  });

  PERSON_FORM = this.fb.group({
    fullname: [this.company?.person_contacted?.fullname, [Validators.required]],
    email: [
      this.company?.person_contacted?.email,
      [Validators.required, , Validators.email],
    ],
    phone: [this.company?.person_contacted?.phone, [Validators.required]],
  });

  COMPANY_FORM = this.fb.group({
    name: [this.company?.name, [Validators.required, Validators.minLength(1)]],
    address: [this.company?.address],
    city: [this.company?.city, Validators.required],
    activity_area: [this.company?.activity_area, [Validators.required]],
    person_contacted: this.PERSON_FORM,
    socialMedia: this.SOCIAL_MEDIA_FORM
  });

  constructor(
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.currentId = this.activatedRoute?.snapshot?.paramMap?.get('id');
    if (!this.company) this.loadCompany(this.currentId);
  }

  loadCompany(id) {
    this.companyService
      .findOne(id)
      .pipe(
        first(),
        tap({
          next: (company) => {
            this.company = company;
            this.fillFormValues(company);
          },
        }),
        catchError((err) => {
          this.toastrService.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }

  edit() {
    this.companyService
      .edit(this.currentId, this.COMPANY_FORM.value)
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Entreprise Modifiée avec succès');
            this.router.navigate([`casal/company/${this.currentId}`]);
          },
        }),
        catchError((err) => {
          this.toastrService.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }

  editPassword() {
    this.dialog.open(EditCompanyPasswordComponent, {
      data: {
        _id: this.currentId
      }
    });
  }

  editLogo() {
    this.dialog.open(EditCompanyLogoComponent, {
      data: {
        _id: this.currentId
      }
    });
  }

  private fillFormValues(company: Company) {
    var { _id, __v, updatedAt, email, createdAt, logo, userId, ...companyData } = company;
    var { _id, ...person_contacted } = company.person_contacted;

    const formValues = {
      ...companyData,
      person_contacted: { ...person_contacted },
    };
    this.COMPANY_FORM.setValue({ ...formValues });
  }
}
