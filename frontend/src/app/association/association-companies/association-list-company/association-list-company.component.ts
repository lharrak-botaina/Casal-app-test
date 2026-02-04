import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { CompanyResult } from 'src/app/core/models/company';
import { CompanyService } from 'src/app/core/services/company.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-association-list-company',
    templateUrl: './association-list-company.component.html',
    styleUrls: ['./association-list-company.component.scss'],
    standalone: false
})
export class AssociationListCompanyComponent implements OnInit, OnDestroy {
  first = 0;
  pageSize = 10;

  filterQuery;
  companies$: Observable<CompanyResult>;
  endpoint = environment.COMPANY_LOGO_HOST;

  private alive: boolean = true;

  constructor(
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ListenToQueryParamsChange();
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.pageSize = event.rows;
    const pageIndex = event.page;
    this.loadCompanies(pageIndex, this.pageSize, this.filterQuery);
  }

  loadCompanies(page, limit, filterQuery) {
    this.companies$ = this.companyService.findByAssociation(page, limit, filterQuery);
  }

  ListenToQueryParamsChange() {
    this.activatedRoute.queryParams
      .pipe(
        takeWhile(() => this.alive),
        tap((_) => (this.first = 0))
      )
      .subscribe((queryPrams) => {
        this.filterQuery = queryPrams;
        this.loadCompanies(0, this.pageSize, queryPrams);
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
