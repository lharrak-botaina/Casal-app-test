import { Component, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { YoungFormService } from 'src/app/core/helpers/young-form.service';
import { CompanyResult } from 'src/app/core/models/company';
import { Data } from 'src/app/core/models/dropdown_data';
import { Passwork } from 'src/app/core/models/passwork';
import { CompanyService } from 'src/app/core/services/company.service';
import { PassworkService } from 'src/app/core/services/passwork.service';

@Component({
  selector: 'app-young-passwork',
  templateUrl: './young-passwork.component.html',
  styleUrls: ['./young-passwork.component.scss'],
})
export class YoungPassworkComponent implements OnInit {
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

  hasCertificate(index) {
    if (this.PASSWORK.value.trainings[index]?.certificate?.obtained)
      return true;

    this.PASSWORK.value.trainings[index].certificate.description = '';
    return false;
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
