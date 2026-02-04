import { Contract } from 'src/app/core/models/contract';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ActivityArea } from 'src/app/core/models/activity_area';
import { Association } from 'src/app/core/models/association';
import { Job } from 'src/app/core/models/job';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { JobService } from 'src/app/core/services/job.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, first, tap } from 'rxjs/operators';
import { AssociationService } from 'src/app/core/services/association.service';
import { MultiSelect } from 'primeng/multiselect';
import { Company, CompanyResult } from 'src/app/core/models/company';
import { CompanyService } from 'src/app/core/services/company.service';

@Component({
    selector: 'app-association-edit-job',
    templateUrl: './association-edit-job.component.html',
    styleUrls: ['./association-edit-job.component.scss'],
    standalone: false
})
export class AssociationEditJobComponent implements OnInit, AfterViewInit {
  job: Job = !window?.history?.state?._id ? null : window?.history?.state;

  currentId;

  associations$: Observable<Association[]>;
  companies$: Observable<CompanyResult>;
  others: Company = {
    _id: null,
    name: 'Autres',
  };

  ACTIVITY_AREA = ActivityArea.List;
  CONTRACT = Contract.TYPES;

  JOB_FORM = this.fb.group({
    title: [this.job?.title, [Validators.required]],
    company: [this.job?.company?.name],
    description: [this.job?.description],
    location: [this.job?.location],
    type_contrat: [this.job?.type_contrat],
    sharedWith: [this.job?.sharedWith?.map((s) => s._id)],
    activity_area: [this.job?.activity_area],
  });

  @ViewChild('sel') multiSelect: MultiSelect;

  constructor(
    private jobService: JobService,
    private associationService: AssociationService,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.associations$ = this.associationService.findLightForAssociation();

    this.companies$ = this.companyService
      .findByAssociation(0, 1000, '')
      .pipe(
        tap((companyResult) => companyResult.companies.unshift(this.others))
      );

    this.currentId = this.activatedRoute?.snapshot?.paramMap?.get('id');
    if (!this.job) this.loadJob(this.currentId);
  }

  ngAfterViewInit() {
    if (this.job) this.updateMultiSelectLabel();
  }

  loadJob(id) {
    this.jobService
      .findOneByAssociation(id)
      .pipe(
        first(),
        tap({
          next: (job) => {
            this.job = job;
            this.fillFormValues(job);
            this.updateMultiSelectLabel();
          },
        }),
        catchError((err) => {
          this.toastrService.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }

  edit() {
    this.jobService
      .editByAssociation(this.currentId, this.JOB_FORM.value)
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Offre d\'emploi modifiée avec succès');
            this.router.navigate([`association/jobs/${this.currentId}`]);
          },
        }),
        catchError((err) => {
          this.toastrService.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }

  private fillFormValues(job: Job) {
    const {
      _id,
      __v,
      updatedAt,
      status,
      createdBy,
      createdAt,
      reference,
      ...jobData
    } = job;

    const formValue = {
      ...jobData,
      sharedWith: job.sharedWith?.map((s) => s._id) || [],
      company: job?.company?._id
    };

    this.JOB_FORM.setValue({ ...formValue });
  }

  updateMultiSelectLabel() {
    if (!this.multiSelect) return;
    this.multiSelect.defaultLabel =
      this.multiSelect?.value?.length && this.multiSelect?.value?.length != 0
        ? `${this.multiSelect?.value?.length} items selected `
        : `Associations`;
  }
}
