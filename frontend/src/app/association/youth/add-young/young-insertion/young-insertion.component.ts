import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { YoungFormService } from 'src/app/core/helpers/young-form.service';
import { CompanyResult } from 'src/app/core/models/company';
import { Data } from 'src/app/core/models/dropdown_data';
import { Job } from 'src/app/core/models/job';
import { CompanyService } from 'src/app/core/services/company.service';
import { JobService } from 'src/app/core/services/job.service';

@Component({
  selector: 'app-young-insertion',
  templateUrl: './young-insertion.component.html',
  styleUrls: ['./young-insertion.component.scss'],
})
export class YoungInsertionComponent implements OnInit, OnDestroy {
  public Data = Data;

  CONTRACT_TYPE = [...Data.FORMELLE_CONTRACT];
  public INSERTION: FormArray;
  public companies$: Observable<CompanyResult>;
  public jobs$: Observable<Job>;
  private alive : boolean = true;
  isValidToInsertion : boolean = false;

  constructor(
    private controlContainer: ControlContainer,
    private companyService: CompanyService,
    private jobService: JobService,
    private young: YoungFormService
  ) {}

  ngOnInit(): void {
    this.INSERTION = <FormArray>this.controlContainer.control;
    this.companies$ = this.getCompanies();
    this.jobs$ = this.getJobs();
    this.isInsertionValid()
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
    ] as FormArray).push(this.young.trackingBeforeForm());
  }

  removeBeforeInsertion(index1, index2) {
    (this.INSERTION.controls['list']['controls'][index1]['controls'][
      'tracking_before'
    ] as FormArray).removeAt(index2);
  }

  onChangeCategory(event : any){
    this.CONTRACT_TYPE = (event.value as string).toLocaleLowerCase() == 'formelle' ?
       [...Data.FORMELLE_CONTRACT] : [...Data.INFORMELLE_CONTRACT]
  }

  isInsertionValid(){
    this.INSERTION.valueChanges.pipe(
      takeWhile(() => this.alive), 
      tap(values=> {
        if(values.list.length <= 0) return;

        const tracking_after = values.list[0]?.tracking_after;
        if(tracking_after.category && tracking_after.contract_type && tracking_after.function_type && tracking_after.insertion_type && tracking_after.duration && tracking_after.salary && tracking_after.justificative_type)
        this.isValidToInsertion = true
    })).subscribe()
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
