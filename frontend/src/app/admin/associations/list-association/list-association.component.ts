import { AssociationResult } from './../../../core/models/association';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AssociationService } from 'src/app/core/services/association.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { takeWhile, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-association',
  templateUrl: './list-association.component.html',
  styleUrls: ['./list-association.component.scss'],
})
export class ListAssociationComponent implements OnInit, OnDestroy, AfterViewInit {

  PAGE_INDEX = 0;
  PAGE_SIZE = 14;

  filterQuery ;
  associations$: Observable<AssociationResult>;
  endpoint = environment.ASSOCIATIONS_DOCS_HOST;
  private alive : boolean = true;
  
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private associationService: AssociationService, private activatedRoute : ActivatedRoute) {}

  ngOnInit(): void {
    this.ListenToQueryParamsChange();
  }

  ngAfterViewInit(): void {
    this.paginator?.page
    .pipe(
        takeWhile(() => this.alive),
        tap(() => this.loadAssociations(this.paginator.pageIndex, this.paginator.pageSize, this.filterQuery))
    )
    .subscribe();
  }

  loadAssociations(page, limit, filterQuery) {
    this.associations$ = this.associationService.find(page, limit, filterQuery);
  }

  ListenToQueryParamsChange(){
    this.activatedRoute.queryParams
    .pipe(takeWhile(() => this.alive),
          tap(_ => this.paginator ? this.paginator.pageIndex = 0 : 0))
    .subscribe((queryPrams) => {
      this.filterQuery = queryPrams;
      this.loadAssociations(this.PAGE_INDEX, this.PAGE_SIZE, queryPrams);
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}