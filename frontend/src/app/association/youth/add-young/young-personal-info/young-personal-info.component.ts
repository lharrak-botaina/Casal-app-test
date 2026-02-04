import { Component, OnInit, Self } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormGroup,
  NgControl,
} from '@angular/forms';
import { Data } from 'src/app/core/models/dropdown_data';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-young-personal-info',
  templateUrl: './young-personal-info.component.html',
  styleUrls: ['./young-personal-info.component.scss'],
})
export class YoungPersonalInfoComponent implements OnInit {
  public Data = Data;
  public PERSONAL_INFO: FormGroup;
  public hobbies = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  public maxDate = new Date();

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {
    this.PERSONAL_INFO = <FormGroup>this.controlContainer.control;
  }

  hasAddiction() {
    if (this.PERSONAL_INFO.value?.physical_state?.addiction?.status)
      return true;

    this.PERSONAL_INFO.value.physical_state.addiction.description = '';
    return false;
  }

  hasHandicap() {
    if (this.PERSONAL_INFO.value?.physical_state?.handicap?.status) return true;

    this.PERSONAL_INFO.value.physical_state.handicap.description = '';
    return false;
  }

  hasHealthIssue() {
    if (this.PERSONAL_INFO.value?.physical_state?.health_issue?.status)
      return true;

    this.PERSONAL_INFO.value.physical_state.health_issue.ongoing_treatment = '';
    this.PERSONAL_INFO.value.physical_state.health_issue.chronic_illness = '';
    return false;
  }

  isNotMoroccan(){
    if (this.PERSONAL_INFO.value?.nationality == 'Autre') return true;

    this.PERSONAL_INFO.value.nationality_comment = '';
    return false;
  }

  addHobby(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.hobbies.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.PERSONAL_INFO.controls['hobbies'].setValue(this.hobbies);
  }

  remove(hobby: string): void {
    const index = this.hobbies.indexOf(hobby);

    if (index >= 0) {
      this.hobbies.splice(index, 1);
    }

    this.PERSONAL_INFO.controls['hobbies'].setValue(this.hobbies);
  }
}
