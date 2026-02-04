import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, takeWhile, tap } from 'rxjs/operators';
import { Company } from 'src/app/core/models/company';
import { CompanyService } from 'src/app/core/services/company.service';
import { DeleteCompanyComponent } from '../delete-company/delete-company.component';

@Component({
  selector: 'app-details-company',
  templateUrl: './details-company.component.html',
  styleUrls: ['./details-company.component.scss'],
})
export class DetailsCompanyComponent implements OnInit, OnDestroy {
  company: Company = !window?.history?.state?._id
    ? null
    : window?.history?.state;
  private alive: boolean = true;
  isSmallScreen : boolean;

  constructor(
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private dialog : MatDialog
  ) {}

  ngOnInit() {
    this.isItASmallScreen();

    if (!this.company)
      this.loadAssociation(this.activatedRoute?.snapshot?.paramMap?.get('id'));
  }

  isItASmallScreen() {
    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .pipe(takeWhile(() => this.alive))
      .subscribe((result) => {
        this.isSmallScreen = result.matches ? true : false;
      });
  }

  loadAssociation(id) {
    this.companyService
      .findOne(id)
      .pipe(
        first(),
        tap({
          next: (association) => (this.company = association),
        }),
        catchError((err) => {
          this.toastrService.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }

  remove() {
    this.dialog.open(DeleteCompanyComponent, {
      data: {
        _id: this.company._id,
      }
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
