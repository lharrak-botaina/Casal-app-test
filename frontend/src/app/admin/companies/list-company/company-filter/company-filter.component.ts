import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityArea } from 'src/app/core/models/activity_area';
import { Data } from 'src/app/core/models/dropdown_data';

@Component({
    selector: 'app-company-filter',
    templateUrl: './company-filter.component.html',
    styleUrls: ['./company-filter.component.scss'],
    standalone: false
})
export class CompanyFilterComponent implements OnInit {
  CITIES = Data.CITIES;
  ACTIVITY_AREA = ActivityArea.List;

  FILTER_FORM = this.fb.group({
    filter: [''],
    city: [''],
    activity_area: [''],
    dateFrom: [null],
    dateTo: [null],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

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

  resetFilters() {
    this.FILTER_FORM.reset();
    this.filter();
  }

  hasActiveFilters(): boolean {
    const values = this.FILTER_FORM.value;
    return Object.values(values).some(v => v !== '' && v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0));
  }
}
