import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AssociationResult } from 'src/app/core/models/association';
import { Data } from 'src/app/core/models/dropdown_data';
import { AssociationService } from 'src/app/core/services/association.service';

@Component({
  selector: 'app-young-admin-filter',
  templateUrl: './young-admin-filter.component.html',
  styleUrls: ['./young-admin-filter.component.scss'],
})
export class YoungAdminFilterComponent implements OnInit {
  association$ : Observable<AssociationResult>;
  Data = Data;
  FILTER_FORM = this.fb.group({
    filter: [''],
    association : [[]],
    youngStatus : ['']
  });

  constructor(
    private fb: FormBuilder,
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
    return this.associationService.find(0, 10000, {});
  }
}
