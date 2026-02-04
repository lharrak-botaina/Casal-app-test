import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormGroup } from '@angular/forms';
import { YoungFormService } from 'src/app/core/helpers/young-form.service';
import { Data } from 'src/app/core/models/dropdown_data';

@Component({
  selector: 'app-edit-young-skills-assessment',
  templateUrl: './edit-young-skills-assessment.component.html',
  styleUrls: ['./edit-young-skills-assessment.component.scss'],
})
export class EditYoungSkillsAssessmentComponent implements OnInit {
  public Data = Data;
  public SKILLS_ASSESSMENT: FormGroup;

  constructor(
    private controlContainer: ControlContainer,
    private young: YoungFormService
  ) {}

  ngOnInit() {
    this.SKILLS_ASSESSMENT = <FormGroup>this.controlContainer.control;
  }

  addProfessionalTraining() {
    (this.SKILLS_ASSESSMENT.controls[
      'professional_training'
    ] as FormArray).push(this.young.professionalTrainingForm());
  }

  removeProfessionalTraining(index) {
    (this.SKILLS_ASSESSMENT.controls[
      'professional_training'
    ] as FormArray).removeAt(index);
  }

  addProfessionalExperience() {
    (this.SKILLS_ASSESSMENT.controls[
      'professional_experience'
    ] as FormArray).push(this.young.professionalExperienceForm());
  }

  removeProfessionalExperience(index) {
    (this.SKILLS_ASSESSMENT.controls[
      'professional_experience'
    ] as FormArray).removeAt(index);
  }
}
