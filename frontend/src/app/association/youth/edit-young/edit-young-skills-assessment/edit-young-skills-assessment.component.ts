import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ControlContainer, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { YoungFormService } from 'src/app/core/helpers/young-form.service';
import { Data } from 'src/app/core/models/dropdown_data';

@Component({
    selector: 'app-edit-young-skills-assessment',
    templateUrl: './edit-young-skills-assessment.component.html',
    styleUrls: ['./edit-young-skills-assessment.component.scss'],
    standalone: false,
    encapsulation: ViewEncapsulation.None
})
export class EditYoungSkillsAssessmentComponent implements OnInit {
  public Data = Data;
  public SKILLS_ASSESSMENT: UntypedFormGroup;

  constructor(
    private controlContainer: ControlContainer,
    private young: YoungFormService
  ) {}

  ngOnInit() {
    this.SKILLS_ASSESSMENT = <UntypedFormGroup>this.controlContainer.control;
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
    ] as UntypedFormArray).push(this.young.professionalExperienceForm());
  }

  removeProfessionalExperience(index) {
    (this.SKILLS_ASSESSMENT.controls[
      'professional_experience'
    ] as UntypedFormArray).removeAt(index);
  }
}
