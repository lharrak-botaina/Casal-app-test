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
import { AssociationEditCompanyPasswordComponent } from './association-edit-company-password/association-edit-company-password.component';
import { AssociationEditCompanyLogoComponent } from './association-edit-company-logo/association-edit-company-logo.component';

@Component({
    selector: 'app-association-edit-company',
    templateUrl: './association-edit-company.component.html',
    styleUrls: ['./association-edit-company.component.scss'],
    standalone: false
})
export class AssociationEditCompanyComponent implements OnInit {
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
      .findOneByAssociation(id)
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
      .editByAssociation(this.currentId, this.COMPANY_FORM.value)
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Entreprise Modifiée avec succès');
            this.router.navigate([`association/companies/${this.currentId}`]);
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
    this.dialog.open(AssociationEditCompanyPasswordComponent, {
      data: {
        _id: this.currentId
      }
    });
  }

  editLogo() {
    this.dialog.open(AssociationEditCompanyLogoComponent, {
      data: {
        _id: this.currentId
      }
    });
  }

  private fillFormValues(company: Company) {
    const { _id: companyId, __v, updatedAt, email, createdAt, logo, userId, createdBy, ...companyData } = company as any;
    const { _id: personId, ...person_contacted } = company.person_contacted;

    const formValues = {
        ...companyData,
        person_contacted: { ...person_contacted },
    };
    this.COMPANY_FORM.setValue({ ...formValues });
}

}
