import { Component, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { YoungFormService } from 'src/app/core/helpers/young-form.service';
import { Data } from 'src/app/core/models/dropdown_data';

@Component({
  selector: 'app-young-capacity-building',
  templateUrl: './young-capacity-building.component.html',
  styleUrls: ['./young-capacity-building.component.scss'],
})
export class YoungCapacityBuildingComponent implements OnInit {
  public Data = Data;
  public CAPACITY_BUILDING: FormGroup;

  constructor(
    private controlContainer: ControlContainer,
    private young: YoungFormService
  ) {}

  ngOnInit(): void {
    this.CAPACITY_BUILDING = <FormGroup>this.controlContainer.control;
  }

  addCapacityTraining() {
    (this.CAPACITY_BUILDING.controls['training'] as FormArray).push(
      this.young.capacityBuildingTrainingForm()
    );
  }

  removeCapacityTraining(index) {
    (this.CAPACITY_BUILDING.controls['training'] as FormArray).removeAt(index);
  }
}
