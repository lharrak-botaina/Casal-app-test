import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { ActivityArea } from 'src/app/core/models/activity_area';
import { Association } from 'src/app/core/models/association';
import { Company, CompanyResult } from 'src/app/core/models/company';
import { Contract } from 'src/app/core/models/contract';
import { AssociationService } from 'src/app/core/services/association.service';
import { CompanyService } from 'src/app/core/services/company.service';
import { JobService } from 'src/app/core/services/job.service';

@Component({
    selector: 'app-association-add-job',
    templateUrl: './association-add-job.component.html',
    styleUrls: ['./association-add-job.component.scss'],
    standalone: false
})
export class AssociationAddJobComponent implements OnInit {
  associations$: Observable<Association[]>;
  companies$: Observable<CompanyResult>;
  others: Company = {
    _id: null,
    name: 'Autres',
  };

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
    private fb: UntypedFormBuilder,
    private jobService: JobService,
    private associationService: AssociationService,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.associations$ = this.associationService.findLightForAssociation();

    this.companies$ = this.companyService
      .findByAssociation(0, 1000, '')
      .pipe(
        tap((companyResult) => companyResult.companies.unshift(this.others))
      );
  }

  add() {
    this.jobService
      .addByAssociation({
        ...this.JOB_FORM.value,
      })
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Offre ajoutée avec succès');
            this.router.navigate(['/association/jobs']);
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
