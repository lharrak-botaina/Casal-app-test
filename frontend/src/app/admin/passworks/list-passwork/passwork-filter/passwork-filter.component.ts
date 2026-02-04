import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-passwork-filter',
  templateUrl: './passwork-filter.component.html',
  styleUrls: ['./passwork-filter.component.scss'],
})
export class PassworkFilterComponent implements OnInit {
  STATUS = ['active', 'inactive'];
  FILTER_FORM = this.fb.group({
    filter: ['', ],
    status: ['active', ],
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
