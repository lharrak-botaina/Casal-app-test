import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from 'src/app/core/models/dropdown_data';

@Component({
    selector: 'app-association-filter',
    templateUrl: './association-filter.component.html',
    styleUrls: ['./association-filter.component.scss'],
    standalone: false
})
export class AssociationFilterComponent implements OnInit {
  CITIES = Data.CITIES;

  FILTER_FORM = this.fb.group({
    filter: [''],
    city: [''],
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
