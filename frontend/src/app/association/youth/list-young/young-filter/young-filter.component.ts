import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from 'src/app/core/models/dropdown_data';

@Component({
    selector: 'app-young-filter',
    templateUrl: './young-filter.component.html',
    styleUrls: ['./young-filter.component.scss'],
    standalone: false
})
export class YoungFilterComponent implements OnInit {
  FILTER_FORM = this.fb.group({
    filter: [''],
    youngStatus : [''],
    level_of_study : ['']
  });

  Data = Data;

  
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  filter() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { ...this.FILTER_FORM.value },
      skipLocationChange: true,
    });
  }

  resetFilters() {
    this.FILTER_FORM.reset();
    this.filter();
  }

  hasActiveFilters(): boolean {
    const values = this.FILTER_FORM.value;
    return Object.values(values).some(v => v !== '' && v !== null && v !== undefined);
  }
}
