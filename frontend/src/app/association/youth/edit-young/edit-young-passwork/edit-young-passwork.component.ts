import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { YoungFormService } from 'src/app/core/helpers/young-form.service';
import { Data } from 'src/app/core/models/dropdown_data';
import { Passwork } from 'src/app/core/models/passwork';
import { PassworkService } from 'src/app/core/services/passwork.service';

@Component({
  selector: 'app-edit-young-passwork',
  templateUrl: './edit-young-passwork.component.html',
  styleUrls: ['./edit-young-passwork.component.scss'],
})
export class EditYoungPassworkComponent implements OnInit {
  public Data = Data;
  public PASSWORK: FormArray;
  public passworks$: Observable<Passwork>;

  constructor(
    private controlContainer: ControlContainer,
    private passworkService: PassworkService,
    private young: YoungFormService
  ) {}

  ngOnInit(): void {
    this.PASSWORK = <FormArray>this.controlContainer.control;
    this.passworks$ = this.getAssociationPassworks();
  }

  getAssociationPassworks() {
    return this.passworkService.findAssociationPassworks();
  }

  addPassworkTraining() {
    (this.PASSWORK.controls['trainings'] as FormArray).push(
      this.young.passworkTrainingForm()
    );
  }

  removePassworkTraining(index) {
    (this.PASSWORK.controls['trainings'] as FormArray).removeAt(index);
  }
}
