import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { Company } from 'src/app/core/models/company';
import { CompanyService } from 'src/app/core/services/company.service';
import { AssociationDeleteCompanyComponent } from '../association-delete-company/association-delete-company.component';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-association-details-company',
    templateUrl: './association-details-company.component.html',
    styleUrls: ['./association-details-company.component.scss'],
    standalone: false
})
export class AssociationDetailsCompanyComponent implements OnInit, OnDestroy {
  company: Company = !window?.history?.state?._id
    ? null
    : window?.history?.state;
  private alive: boolean = true;
  endpoint = environment.COMPANY_LOGO_HOST;

  constructor(
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (!this.company)
      this.loadCompany(this.activatedRoute?.snapshot?.paramMap?.get('id'));
  }

  loadCompany(id) {
    this.companyService
      .findOneByAssociation(id)
      .pipe(
        first(),
        tap({
          next: (company) => (this.company = company),
        }),
        catchError((err) => {
          this.toastrService.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }

  remove() {
    this.dialog.open(AssociationDeleteCompanyComponent, {
      data: {
        _id: this.company._id,
      }
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
