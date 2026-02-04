import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AssociationResult } from 'src/app/core/models/association';
import { Data } from 'src/app/core/models/dropdown_data';
import { AssociationService } from 'src/app/core/services/association.service';

@Component({
    selector: 'app-young-admin-filter',
    templateUrl: './young-admin-filter.component.html',
    styleUrls: ['./young-admin-filter.component.scss'],
    standalone: false
})
export class YoungAdminFilterComponent implements OnInit {
  association$ : Observable<AssociationResult>;
  Data = Data;
  FILTER_FORM = this.fb.group({
    filter: [''],
    association : [[]],
    youngStatus : [''],
    dateFrom: [null],
    dateTo: [null],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private associationService : AssociationService
  ) {}

  ngOnInit(): void {
    this.association$ = this.getAssociations();
  }

  filter() {
    const formValue = this.FILTER_FORM.value;
    const queryParams = {
      ...formValue,
      dateFrom: formValue.dateFrom ? new Date(formValue.dateFrom).toISOString() : null,
      dateTo: formValue.dateTo ? new Date(formValue.dateTo).toISOString() : null,
    };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      skipLocationChange: true,
    });
  }

  getAssociations(){
    return this.associationService.find(0, 10000, {});
  }

  resetFilters() {
    this.FILTER_FORM.reset({ filter: '', association: [], youngStatus: '', dateFrom: null, dateTo: null });
    this.filter();
  }

  hasActiveFilters(): boolean {
    const values = this.FILTER_FORM.value;
    return values.filter !== '' ||
           (values.association && values.association.length > 0) ||
           values.youngStatus !== '' ||
           values.dateFrom !== null ||
           values.dateTo !== null;
  }
}
