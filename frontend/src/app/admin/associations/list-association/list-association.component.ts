import { AssociationResult } from './../../../core/models/association';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AssociationService } from 'src/app/core/services/association.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { takeWhile, tap } from 'rxjs/operators';

@Component({
    selector: 'app-list-association',
    templateUrl: './list-association.component.html',
    styleUrls: ['./list-association.component.scss'],
    standalone: false
})
export class ListAssociationComponent implements OnInit, OnDestroy {

  first = 0;
  pageSize = 14;

  filterQuery;
  associations$: Observable<AssociationResult>;
  endpoint = environment.ASSOCIATIONS_DOCS_HOST;
  private alive: boolean = true;

  constructor(private associationService: AssociationService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.ListenToQueryParamsChange();
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.pageSize = event.rows;
    const pageIndex = event.page;
    this.loadAssociations(pageIndex, this.pageSize, this.filterQuery);
  }

  loadAssociations(page, limit, filterQuery) {
    this.associations$ = this.associationService.find(page, limit, filterQuery);
  }

  ListenToQueryParamsChange() {
    this.activatedRoute.queryParams
    .pipe(
      takeWhile(() => this.alive),
      tap((_) => (this.first = 0))
    )
    .subscribe((queryPrams) => {
      this.filterQuery = queryPrams;
      this.loadAssociations(0, this.pageSize, queryPrams);
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}