import { catchError, first, takeWhile, tap } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Association } from 'src/app/core/models/association';
import { environment } from 'src/environments/environment';
import { BreakpointObserver } from '@angular/cdk/layout';
import { pipe, throwError } from 'rxjs';
import { AssociationService } from 'src/app/core/services/association.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAssociationComponent } from '../delete-association/delete-association.component';

@Component({
  selector: 'app-details-association',
  templateUrl: './details-association.component.html',
  styleUrls: ['./details-association.component.scss'],
})
export class DetailsAssociationComponent implements OnInit, OnDestroy {
  association: Association = !window?.history?.state?._id ? null : window?.history?.state ;
  host = environment.ASSOCIATIONS_DOCS_HOST;
  private alive: boolean = true;
  isSmallScreen: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private associationService: AssociationService,
    private toastrService: ToastrService,
    private activatedRoute : ActivatedRoute,
    private dialog : MatDialog
  ) {}

  ngOnInit() {
    this.isItASmallScreen();

    if(!this.association) this.loadAssociation(this.activatedRoute?.snapshot?.paramMap?.get('id')); 
  }

  isItASmallScreen() {
    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .pipe(takeWhile(() => this.alive))
      .subscribe((result) => {
        this.isSmallScreen = result.matches ? true : false;
      });
  }

  loadAssociation(id) {
    this.associationService
      .findOne(id)
      .pipe(
        first(),
        tap({
          next: (association) => (this.association = association),
        }),
        catchError((err) => {
          this.toastrService.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }

  remove() {
    this.dialog.open(DeleteAssociationComponent, {
      data: {
        _id: this.association._id,
      }
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
