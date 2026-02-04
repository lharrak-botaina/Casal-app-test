import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-job-filter',
    templateUrl: './job-filter.component.html',
    styleUrls: ['./job-filter.component.scss'],
    standalone: false
})
export class JobFilterComponent implements OnInit {
  STATUS = ['active', 'inactive'];
  FILTER_FORM = this.fb.group({
    filter: ['', ],
    status: ['active', ],
  });

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
    this.FILTER_FORM.reset({ filter: '', status: 'active' });
    this.filter();
  }

  hasActiveFilters(): boolean {
    const values = this.FILTER_FORM.value;
    return values.filter !== '' || values.status !== 'active';
  }
}
