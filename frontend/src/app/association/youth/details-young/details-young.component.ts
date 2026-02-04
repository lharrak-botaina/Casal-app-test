import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { DeleteYoungComponent } from 'src/app/admin/youth/delete-young/delete-young.component';
import { Young } from 'src/app/core/models/young';
import { YoungService } from 'src/app/core/services/young.service';

@Component({
    selector: 'app-details-young',
    templateUrl: './details-young.component.html',
    styleUrls: ['./details-young.component.scss'],
    standalone: false
})
export class DetailsYoungComponent implements OnInit {
  young: Young = !window?.history?.state?._id ? null : window?.history?.state;
  constructor(
    private youngService: YoungService,
    private toasrt: ToastrService,
    private activatedRoute: ActivatedRoute,
    private dialog : MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.young)
      this.loadYoung(this.activatedRoute?.snapshot?.paramMap?.get('id'));
  }

  loadYoung(id) {
    this.youngService
      .findOne(id)
      .pipe(
        first(),
        tap({
          next: (young) => (this.young = young),
        }),
        catchError((err) => {
          this.toasrt.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }

  remove() {
    this.dialog.open(DeleteYoungComponent, {
      data: {
        _id: this.young._id,
      }
    });
  }
}
