import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  ControlContainer,
  UntypedFormArray,
  FormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { takeWhile, tap } from 'rxjs/operators';
import { YoungFormService } from 'src/app/core/helpers/young-form.service';
import { Data } from 'src/app/core/models/dropdown_data';

@Component({
    selector: 'app-young-skills-assessment',
    templateUrl: './young-skills-assessment.component.html',
    styleUrls: ['./young-skills-assessment.component.scss'],
    standalone: false,
    encapsulation: ViewEncapsulation.None
})
export class YoungSkillsAssessmentComponent implements OnInit, OnDestroy {
  public Data = Data;
  public SKILLS_ASSESSMENT: UntypedFormGroup;

  alive : boolean = true;
  showLanguageComment : boolean = false;

  constructor(
    private controlContainer: ControlContainer,
    private young: YoungFormService
  ) {}

  ngOnInit() {
    this.SKILLS_ASSESSMENT = <UntypedFormGroup>this.controlContainer.control;
    this.isOtherLanguagesSelected();
  }

  addProfessionalTraining() {
    (this.SKILLS_ASSESSMENT.controls[
      'professional_training'
    ] as UntypedFormArray).push(this.young.professionalTrainingForm());
  }

  removeProfessionalTraining(index) {
    (this.SKILLS_ASSESSMENT.controls[
      'professional_training'
    ] as UntypedFormArray).removeAt(index);
  }

  addProfessionalExperience() {
    (this.SKILLS_ASSESSMENT.controls[
      'professional_experience'
    ] as UntypedFormArray).push(
      this.young.professionalExperienceForm()
    );
  }

  removeProfessionalExperience(index) {
    (this.SKILLS_ASSESSMENT.controls[
      'professional_experience'
    ] as UntypedFormArray).removeAt(index);
  }

  isOtherLanguagesSelected(){
    this.SKILLS_ASSESSMENT?.valueChanges
      .pipe(
        takeWhile(() => this.alive),
        tap(skill => this.showLanguageComment = skill?.languages?.includes("Autre")),
      )
      .subscribe()

  }

  ngOnDestroy(): void {
      this.alive = false
  }
}
