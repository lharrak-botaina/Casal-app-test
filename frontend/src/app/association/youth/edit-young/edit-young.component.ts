import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { PhotoService } from 'src/app/core/helpers/photo.service';
import { YoungFormService } from 'src/app/core/helpers/young-form.service';
import {
  CapacityBuilding,
  Insertion,
  InsertionList,
  SkillsAssessment,
  Young,
} from 'src/app/core/models/young';
import { YoungService } from 'src/app/core/services/young.service';

@Component({
    selector: 'app-edit-young',
    templateUrl: './edit-young.component.html',
    styleUrls: ['./edit-young.component.scss'],
    standalone: false,
    encapsulation: ViewEncapsulation.None
})
export class EditYoungComponent implements OnInit, AfterViewInit {
  young: Young = !window?.history?.state?._id ? null : window?.history?.state;
  currentId;
  YONG_FORM: UntypedFormGroup;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private fb: UntypedFormBuilder,
    private youngForm: YoungFormService,
    private youngService: YoungService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.YONG_FORM = this.fb.group({
      personal_info: this.youngForm.PersonalInfoUpdateForm(),
      skills_assessment: this.youngForm.skillsAssessmentForm(),
      capacity_building: this.youngForm.capacityBuildingForm(),
      passwork: this.youngForm.passworkForm(),
      insertion: this.youngForm.insertionForm(),
    });
  }

  ngOnInit(): void {
    this.currentId = this.activatedRoute?.snapshot?.paramMap?.get('id');
    if (!this.young) this.loadYoung(this.currentId);
    else this.fillFormValues(this.young);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.stepper.selectedIndex = 4
    });
  }

  loadYoung(id) {
    this.youngService
      .findOne(id)
      .pipe(
        first(),
        tap({
          next: (young) => {
            this.young = young;
            this.fillFormValues(young);
          },
        }),
        catchError((err) => {
          this.toastr.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }

  edit() {
    this.youngService
      .edit(this.currentId, this.YONG_FORM.value)
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastr.success('Jeune modifié avec succès');
            this.router.navigate([`../`], { relativeTo: this.activatedRoute });
          },
        }),
        catchError((err) => {
          this.toastr.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }

  private fillFormValues(young: Young) {
    let {
      _id,
      __v,
      status,
      createdBy,
      navigationId,
      updatedAt,
      createdAt,
      ...youngData
    } = young;
    var { photo, rate, identifier, ...youngInfo } = young.personal_info;
    var { rate, ...youngSkills } = young.skills_assessment;
    var { rate, ...youngCapacity } = young.capacity_building;
    var { rate, ...youngPasswork } = young.passwork;
    var { rate, ...youngInsertion } = young.insertion;

    young.passwork.trainings.map(
      (t) =>
        (t.passwork_training = t.passwork_training
          ? t.passwork_training?._id
          : null)
    );

    this.setUpForm(young);

    const formValues: Young = {
      ...youngData,
      personal_info: { ...youngInfo },
      skills_assessment: { ...youngSkills },
      capacity_building: { ...youngCapacity },
      passwork: { ...youngPasswork },
      insertion: { ...youngInsertion },
    };

    this.YONG_FORM.setValue({ ...formValues });
  }

  setUpForm(young: Young) {
    this.addPassworkTraining(young?.passwork);
    this.addProfessionalTraining(young.skills_assessment);
    this.addProfessionalExperience(young.skills_assessment);
    this.addCapacityTraining(young.capacity_building);
    this.addInsertion(young?.insertion);
  }

  addPassworkTraining(passwork) {
    for (let i = 1; i < passwork?.trainings.length; i++) {
      (this.YONG_FORM.controls['passwork']['controls']['trainings'][
        'controls'
      ] as UntypedFormArray).push(this.youngForm.passworkTrainingForm());
    }
  }

  addProfessionalTraining(skills_assessment: SkillsAssessment) {
    for (let i = 1; i < skills_assessment?.professional_training.length; i++) {
      (this.YONG_FORM.controls['skills_assessment']['controls'][
        'professional_training'
      ] as UntypedFormArray).push(this.youngForm.professionalTrainingForm());
    }
  }

  addProfessionalExperience(skills_assessment: SkillsAssessment) {
    for (
      let i = 1;
      i < skills_assessment?.professional_experience.length;
      i++
    ) {
      (this.YONG_FORM.controls['skills_assessment']['controls'][
        'professional_experience'
      ] as UntypedFormArray).push(this.youngForm.professionalExperienceForm());
    }
  }

  addCapacityTraining(capacity_building: CapacityBuilding) {
    for (let i = 1; i < capacity_building?.training.length; i++) {
      (this.YONG_FORM.controls['capacity_building']['controls'][
        'training'
      ] as UntypedFormArray).push(this.youngForm.capacityBuildingTrainingForm());
    }
  }

  addInsertion(insertion: Insertion) {
    for (let i = 0; i < insertion?.list.length; i++) {
      if (i != 0) {
        (this.YONG_FORM.controls['insertion']['controls'][
          'list'
        ] as UntypedFormArray).push(this.youngForm.trackingsForm());
      }

      this.addBeforeInsertion(insertion?.list[i], i);
    }
  }

  addBeforeInsertion(insertionList: InsertionList, index) {
    for (let i = 1; i < insertionList.tracking_before.length; i++) {
      (this.YONG_FORM.controls['insertion']['controls']['list']['controls'][
        index
      ]['controls']['tracking_before'] as UntypedFormArray).push(
        this.youngForm.trackingBeforeForm()
      );
    }
  }
}
