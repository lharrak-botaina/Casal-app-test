import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ControlContainer, UntypedFormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { YoungFormService } from 'src/app/core/helpers/young-form.service';
import { CompanyResult } from 'src/app/core/models/company';
import { Data } from 'src/app/core/models/dropdown_data';
import { Job } from 'src/app/core/models/job';
import { CompanyService } from 'src/app/core/services/company.service';
import { JobService } from 'src/app/core/services/job.service';
import { EditYoungJustificationDialogComponent } from '../edit-young-justification-dialog/edit-young-justification-dialog.component';

@Component({
    selector: 'app-edit-young-insertion',
    templateUrl: './edit-young-insertion.component.html',
    styleUrls: ['./edit-young-insertion.component.scss'],
    standalone: false,
    encapsulation: ViewEncapsulation.None
})
export class EditYoungInsertionComponent implements OnInit {
  @Input() currentUserId;
  public Data = Data;
  CONTRACT_TYPE = [...Data.FORMELLE_CONTRACT];
  public INSERTION: UntypedFormArray;
  public companies$: Observable<CompanyResult>;
  public jobs$: Observable<Job>;

  constructor(
    private controlContainer: ControlContainer,
    private companyService: CompanyService,
    private young: YoungFormService,
    private jobService: JobService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.INSERTION = <UntypedFormArray>this.controlContainer.control;
    this.companies$ = this.getCompanies();
    this.jobs$ = this.getJobs();
  }

  getCompanies() {
    return this.companyService.find(0, 10000, {});
  }

  getJobs() {
    return this.jobService.findAssociationJobs();
  }

  addBeforeInsertion(index) {
    (this.INSERTION.controls['list']['controls'][index]['controls'][
      'tracking_before'
    ] as UntypedFormArray).push(this.young.trackingBeforeForm());
  }

  removeBeforeInsertion(index1, index2) {
    (this.INSERTION.controls['list']['controls'][index1]['controls'][
      'tracking_before'
    ] as UntypedFormArray).removeAt(index2);
  }

  editJustification(index) {
    this.dialog.open(EditYoungJustificationDialogComponent, {
      data: {
        _id: this.currentUserId,
        index : index,
        formControl : (this.INSERTION.controls['list']['controls'][index]['controls']['tracking_after'] as UntypedFormArray)
      },
    });
  }

  onChangeCategory(event : any){
    this.CONTRACT_TYPE = (event.value as string).toLocaleLowerCase() == 'formelle' ?
       [...Data.FORMELLE_CONTRACT] : [...Data.INFORMELLE_CONTRACT]
  }
}
