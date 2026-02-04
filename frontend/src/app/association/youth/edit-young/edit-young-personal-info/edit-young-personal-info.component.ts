import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { ControlContainer, UntypedFormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { takeWhile, tap } from 'rxjs/operators';
import { Data } from 'src/app/core/models/dropdown_data';
import { EditPhotoDialogComponent } from '../edit-photo-dialog/edit-photo-dialog.component';

@Component({
    selector: 'app-edit-young-personal-info',
    templateUrl: './edit-young-personal-info.component.html',
    styleUrls: ['./edit-young-personal-info.component.scss'],
    standalone: false,
    encapsulation: ViewEncapsulation.None
})
export class EditYoungPersonalInfoComponent implements OnInit, OnDestroy {
  @Input() currentUserId;
  public maxDate = new Date();
  public Data = Data;
  public PERSONAL_INFO: UntypedFormGroup;
  public hobbies = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  private alive: boolean = true;

  constructor(
    private controlContainer: ControlContainer,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.PERSONAL_INFO = <UntypedFormGroup>this.controlContainer?.control;
    this.setHobbies()
  }

  setHobbies() {
    this.hobbies = this.PERSONAL_INFO?.value?.hobbies;

    this.PERSONAL_INFO.valueChanges
      .pipe(
        takeWhile(() => this.alive),
        tap((value) => {
          this.hobbies = value?.hobbies;
        })
      )
      .subscribe();
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

  editPhoto() {
    this.dialog.open(EditPhotoDialogComponent, {
      data: {
        _id: this.currentUserId,
      },
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
