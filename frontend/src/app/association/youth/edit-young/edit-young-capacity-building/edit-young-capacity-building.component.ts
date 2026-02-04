import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ControlContainer, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { YoungFormService } from 'src/app/core/helpers/young-form.service';
import { Data } from 'src/app/core/models/dropdown_data';

@Component({
    selector: 'app-edit-young-capacity-building',
    templateUrl: './edit-young-capacity-building.component.html',
    styleUrls: ['./edit-young-capacity-building.component.scss'],
    standalone: false,
    encapsulation: ViewEncapsulation.None
})
export class EditYoungCapacityBuildingComponent implements OnInit {
  public Data = Data;
  public CAPACITY_BUILDING: UntypedFormGroup;

  constructor(
    private controlContainer: ControlContainer,
    private young: YoungFormService
  ) {}

  ngOnInit(): void {
    this.CAPACITY_BUILDING = <UntypedFormGroup>this.controlContainer.control;
  }

  addCapacityTraining() {
    (this.CAPACITY_BUILDING.controls['training'] as UntypedFormArray).push(
      this.young.capacityBuildingTrainingForm()
    );
  }

  removeCapacityTraining(index) {
    (this.CAPACITY_BUILDING.controls['training'] as UntypedFormArray).removeAt(index);
  }
}
