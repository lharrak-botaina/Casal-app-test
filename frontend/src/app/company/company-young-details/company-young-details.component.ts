import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { Young } from 'src/app/core/models/young';
import { YoungService } from 'src/app/core/services/young.service';

@Component({
    selector: 'app-company-young-details',
    templateUrl: './company-young-details.component.html',
    styleUrls: ['./company-young-details.component.scss'],
    standalone: false
})
export class CompanyYoungDetailsComponent implements OnInit {
  young: Young = !window?.history?.state?._id ? null : window?.history?.state;
  constructor(
    private youngService: YoungService,
    private toasrt: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (!this.young)
      this.loadYoung(this.activatedRoute?.snapshot?.paramMap?.get('id'));
  }

  loadYoung(id) {
    this.youngService
      .findOneByCompany(id)
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

}
