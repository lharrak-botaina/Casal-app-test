import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from 'src/app/core/models/dropdown_data';

@Component({
  selector: 'app-association-filter',
  templateUrl: './association-filter.component.html',
  styleUrls: ['./association-filter.component.scss'],
})
export class AssociationFilterComponent implements OnInit {
  CITIES = Data.CITIES;

  FILTER_FORM = this.fb.group({
    filter: [''],
    city: [''],
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
