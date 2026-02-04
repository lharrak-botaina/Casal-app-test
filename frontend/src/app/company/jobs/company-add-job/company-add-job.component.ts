import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { ActivityArea } from 'src/app/core/models/activity_area';
import { Association } from 'src/app/core/models/association';
import { Contract } from 'src/app/core/models/contract';
import { AssociationService } from 'src/app/core/services/association.service';
import { JobService } from 'src/app/core/services/job.service';

@Component({
  selector: 'app-company-add-job',
  templateUrl: './company-add-job.component.html',
  styleUrls: ['./company-add-job.component.scss']
})
export class CompanyAddJobComponent implements OnInit {
  associations$: Observable<Association[]>;

  ACTIVITY_AREA = ActivityArea.List;
  CONTRACT = Contract.TYPES;

  JOB_FORM = this.fb.group({
    title: ['', [Validators.required]],
    company: [null],
    description: [''],
    location: [''],
    type_contrat: [''],
    sharedWith: [[]],
    activity_area: [''],
  });

  @ViewChild('form') form: FormGroupDirective;

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private associationService: AssociationService,
    private toastrService: ToastrService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.associations$ = this.associationService.findLight();
  }

  add() {
    this.jobService
      .addByCompany({
        ...this.JOB_FORM.value,
      })
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Offre ajoutée avec succès');
            this.router.navigate(['/company/young']);
          },
        }),
        catchError((err) => {
          this.toastrService.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }
}
