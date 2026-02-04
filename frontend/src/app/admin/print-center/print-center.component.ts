import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { DocumentResult } from 'src/app/core/models/document';
import { DocumentService } from 'src/app/core/services/document.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-print-center',
  templateUrl: './print-center.component.html',
  styleUrls: ['./print-center.component.scss'],
})
export class PrintCenterComponent implements OnInit {
  PAGE_INDEX = 0;
  PAGE_SIZE = 10;

  filterQuery;
  documents$: Observable<DocumentResult>;
  private alive: boolean = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  host = environment.DOCUMENTS_DOCS_HOST;

  constructor(private documentService: DocumentService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.ListenToQueryParamsChange();
  }

  ngAfterViewInit(): void {
    this.paginator?.page
      .pipe(
        takeWhile(() => this.alive),
        tap(() =>
          this.loadDocuments(
            this.paginator.pageIndex,
            this.paginator.pageSize,
          )
        )
      )
      .subscribe();
  }

  loadDocuments(page, limit) {
    this.documents$ = this.documentService.find(page, limit);
  }

  ListenToQueryParamsChange() {
    this.activatedRoute.queryParams
      .pipe(
        takeWhile(() => this.alive),
        tap((_) => (this.paginator ? (this.paginator.pageIndex = 0) : 0))
      )
      .subscribe((queryPrams) => {
        // this.filterQuery = queryPrams;
        this.loadDocuments(this.PAGE_INDEX, this.PAGE_SIZE);
      });
  }

  download(url : string){
    window.open(this.host + url, '_blank');
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
