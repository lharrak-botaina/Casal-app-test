import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityArea } from 'src/app/core/models/activity_area';
import { Data } from 'src/app/core/models/dropdown_data';

@Component({
  selector: 'app-company-filter',
  templateUrl: './company-filter.component.html',
  styleUrls: ['./company-filter.component.scss'],
})
export class CompanyFilterComponent implements OnInit {
  CITIES = Data.CITIES;
  ACTIVITY_AREA = ActivityArea.List;

  FILTER_FORM = this.fb.group({
    filter: [''],
    city: [''],
    activity_area: [''],
  });

  constructor(
    private fb: FormBuilder,
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
}
