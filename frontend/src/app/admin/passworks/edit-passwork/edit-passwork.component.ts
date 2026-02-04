import { EditPassworkTrainingModulesComponent } from './edit-passwork-training-modules/edit-passwork-training-modules.component';
import { ActivityArea } from 'src/app/core/models/activity_area';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AssociationResult } from 'src/app/core/models/association';
import { CompanyResult } from 'src/app/core/models/company';
import { Passwork } from 'src/app/core/models/passwork';
import { MultiSelect } from 'primeng/multiselect';
import { PassworkService } from 'src/app/core/services/passwork.service';
import { AssociationService } from 'src/app/core/services/association.service';
import { CompanyService } from 'src/app/core/services/company.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, first, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditPassworkTrainingPlanningComponent } from './edit-passwork-training-planning/edit-passwork-training-planning.component';

@Component({
    selector: 'app-edit-passwork',
    templateUrl: './edit-passwork.component.html',
    styleUrls: ['./edit-passwork.component.scss'],
    standalone: false
})
export class EditPassworkComponent implements OnInit, AfterViewInit{
  passwork: Passwork = !window?.history?.state?._id ? null : window?.history?.state;

  ACTIVITY_AREA = ActivityArea.List;
  currentId;

  associations$: Observable<AssociationResult>;
  companies$ : Observable<CompanyResult>;

  TRAINING_CENTER_FORM = this.fb.group({
    name: [this.passwork?.training_center?.name],
    address: [this.passwork?.training_center?.address],
    phone: [this.passwork?.training_center?.phone],
    email: [this.passwork?.training_center?.email, [Validators.email]],
  });

  PASSWORK_FORM = this.fb.group({
    title: [this.passwork?.title, [Validators.required]],
    module: [this.passwork?.module],
    associations: [this.passwork?.associations?.map((s) => s._id)],
    company: [this.passwork?.company?._id],
    training_center: this.TRAINING_CENTER_FORM,
    nbr_beneficiaries: [this.passwork?.nbr_beneficiaries],
    start_date: [this.passwork?.start_date],
    end_date: [this.passwork?.end_date]
  });

  @ViewChild('sel') multiSelect: MultiSelect;

  constructor(
    private passworkService: PassworkService,
    private associationService: AssociationService,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.associations$ = this.associationService.find(0, 1000, '');
    this.companies$ = this.companyService.find(0, 1000, '');

    this.currentId = this.activatedRoute?.snapshot?.paramMap?.get('id');
    if(!this.passwork) this.loadPasswork(this.currentId);
  }

  ngAfterViewInit(){
    if(this.passwork) this.updateMultiSelectLabel();
  }

  loadPasswork(id) {
    this.passworkService
      .findOne(id)
      .pipe(
        first(),
        tap({
          next: (company) => {
            this.passwork = company;
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
    this.passworkService
      .edit(this.currentId, this.PASSWORK_FORM.value)
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastrService.success('Passwork modifié avec succès');
            this.router.navigate([`casal/passwork/${this.currentId}`]);
          },
        }),
        catchError((err) => {
          this.toastrService.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }

  private fillFormValues(passwork: Passwork) {
    const {
      _id,
      __v,
      updatedAt,
      status,
      createdAt,
      training_modules,
      training_planning,
      ...passworkData
    } = passwork;

    const formValue = {
      ...passworkData,
      associations: passwork?.associations.map((s) => s._id),
      company : passwork?.company?._id || null
    };

    console.log(formValue);

    this.PASSWORK_FORM.setValue({ ...formValue });
  }

  updateMultiSelectLabel() {
    this.multiSelect.defaultLabel =
    this.multiSelect?.value?.length && this.multiSelect?.value?.length != 0
        ? `${this.multiSelect?.value?.length} items selected `
        : `Associations`;
  }

  editTrainingModules(){
    this.dialog.open(EditPassworkTrainingModulesComponent, {
      data: {
        _id: this.currentId
      }
    });
  }

  editTrainingPlanning(){
    this.dialog.open(EditPassworkTrainingPlanningComponent, {
      data: {
        _id: this.currentId
      }
    });
  }
}

