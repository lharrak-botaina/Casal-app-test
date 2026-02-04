import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { Passwork } from 'src/app/core/models/passwork';
import { PassworkService } from 'src/app/core/services/passwork.service';
import { environment } from 'src/environments/environment';
import { ArchivePassworkComponent } from '../archive-passwork/archive-passwork.component';

@Component({
  selector: 'app-details-passwork',
  templateUrl: './details-passwork.component.html',
  styleUrls: ['./details-passwork.component.scss'],
})
export class DetailsPassworkComponent implements OnInit, OnDestroy {
  passwork: Passwork = !window?.history?.state?._id ? null : window?.history?.state;
  private alive: boolean = true;
  isSmallScreen: boolean;
  host = environment.PASSWORK_DOCS_HOST;
  
  constructor(
    private passworkService: PassworkService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (!this.passwork)
      this.loadPasswork(this.activatedRoute?.snapshot?.paramMap?.get('id'));
  }

  loadPasswork(id) {
    this.passworkService
      .findOne(id)
      .pipe(
        first(),
        tap({
          next: (passwork) => (this.passwork = passwork),
        }),
        catchError((err) => {
          this.toastrService.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }

  archive() {
    this.dialog.open(ArchivePassworkComponent, {
      data: {
        _id: this.passwork._id,
      },
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
