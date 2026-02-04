import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Association } from 'src/app/core/models/association';
import { Data } from 'src/app/core/models/dropdown_data';
import { AssociationService } from 'src/app/core/services/association.service';

@Component({
    selector: 'app-company-filter-youth',
    templateUrl: './company-filter-youth.component.html',
    styleUrls: ['./company-filter-youth.component.scss'],
    standalone: false
})
export class CompanyFilterYouthComponent implements OnInit {
  association$ : Observable<Association[]>;

  CITIES = Data.CITIES;

  FILTER_FORM = this.fb.group({
    association: [''],
    youngCity: [''],
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
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { ...this.FILTER_FORM.value },
      skipLocationChange: true,
    });
  }

  getAssociations(){
    return this.associationService.findLight();
  }

  resetFilters() {
    this.FILTER_FORM.reset({ association: '', youngCity: '' });
    this.filter();
  }

  hasActiveFilters(): boolean {
    const values = this.FILTER_FORM.value;
    return (values.association && values.association.length > 0) ||
           (values.youngCity && values.youngCity.length > 0);
  }
}
