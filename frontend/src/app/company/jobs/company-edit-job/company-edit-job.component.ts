import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MultiSelect } from 'primeng/multiselect';
import { Observable, throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { ActivityArea } from 'src/app/core/models/activity_area';
import { Association, AssociationResult } from 'src/app/core/models/association';
import { Contract } from 'src/app/core/models/contract';
import { Job } from 'src/app/core/models/job';
import { AssociationService } from 'src/app/core/services/association.service';
import { JobService } from 'src/app/core/services/job.service';

@Component({
    selector: 'app-company-edit-job',
    templateUrl: './company-edit-job.component.html',
    styleUrls: ['./company-edit-job.component.scss'],
    standalone: false
})
export class CompanyEditJobComponent implements OnInit {
  job: Job = !window?.history?.state?._id ? null : window?.history?.state;

  currentId;

  associations$: Observable<Association[]>;
  ACTIVITY_AREA = ActivityArea.List;
  CONTRACT = Contract.TYPES;

  JOB_FORM = this.fb.group({
    title: [this.job?.title, [Validators.required]],
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
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.associations$ = this.associationService.findLight();

    this.currentId = this.activatedRoute?.snapshot?.paramMap?.get('id');
    if(!this.job) this.loadJob(this.currentId);
  }

  ngAfterViewInit(){
    if(this.job) this.updateMultiSelectLabel();
  }

  loadJob(id) {
    this.jobService
      .findOneByCompany(id)
      .pipe(
        first(),
        tap({
          next: (company) => {
            this.job = company;
            this.fillFormValues(company);
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
      .editCompanyJob(this.currentId, this.JOB_FORM.value)
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Offre d\'emploi modifiée avec succès');
            this.router.navigate([`company/job/${this.currentId}`]);
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
      company,
      ...jobData
    } = job;

    const formValue = {
      ...jobData,
      sharedWith: job.sharedWith.map((s) => s._id)
    };

    this.JOB_FORM.setValue({ ...formValue });
  }

  updateMultiSelectLabel() {
    this.multiSelect.defaultLabel =
    this.multiSelect?.value?.length && this.multiSelect?.value?.length != 0
        ? `${this.multiSelect?.value?.length} items selected `
        : `Associations`;
  }

}
