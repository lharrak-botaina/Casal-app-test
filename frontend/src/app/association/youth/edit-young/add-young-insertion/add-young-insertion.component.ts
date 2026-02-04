import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { PhotoService } from 'src/app/core/helpers/photo.service';
import { YoungFormService } from 'src/app/core/helpers/young-form.service';
import { CompanyResult } from 'src/app/core/models/company';
import { Data } from 'src/app/core/models/dropdown_data';
import { Job } from 'src/app/core/models/job';
import { CompanyService } from 'src/app/core/services/company.service';
import { JobService } from 'src/app/core/services/job.service';
import { YoungService } from 'src/app/core/services/young.service';

@Component({
    selector: 'app-add-young-insertion',
    templateUrl: './add-young-insertion.component.html',
    styleUrls: ['./add-young-insertion.component.scss'],
    standalone: false
})
export class AddYoungInsertionComponent implements OnInit {
  public Data = Data;
  
  CONTRACT_TYPE = [...Data.FORMELLE_CONTRACT];
  public INSERTION: UntypedFormGroup;
  public companies$: Observable<CompanyResult>;
  private currentId;
  public jobs$: Observable<Job>;

  constructor(
    private companyService: CompanyService,
    private youngFormBuilder: YoungFormService,
    private photoService: PhotoService,
    private youngService : YoungService,
    private jobService: JobService,
    private activatedRoute : ActivatedRoute,
    private toastr : ToastrService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.currentId = this.activatedRoute?.snapshot?.paramMap?.get('id');
    this.INSERTION = this.youngFormBuilder.trackingsFormAdd();
    this.companies$ = this.getCompanies();
    this.jobs$ = this.getJobs();
  }

  getCompanies() {
    return this.companyService.find(0, 10000, {});
  }
  
  getJobs() {
    return this.jobService.findAssociationJobs();
  }

  addBeforeInsertion() {
    (this.INSERTION.controls['tracking_before'] as UntypedFormArray).push(
      this.youngFormBuilder.trackingBeforeForm()
    );
  }

  removeBeforeInsertion(index) {
    (this.INSERTION.controls['tracking_before'] as UntypedFormArray).removeAt(index);
  }

  async addInsertion() {
    if(!this.INSERTION.valid) return;
    
    const base64file = await this.fileToBase64();

    const justificationFile = { justification : base64file };
    const payload = {...this.INSERTION.value, tracking_after : {...this.INSERTION.value.tracking_after, ...justificationFile }}

    this.youngService
      .addInsertion(this.currentId, payload)
      .pipe(
        first(),
        tap({
          next: () => {
            this.toastr.success('Insertion ajouté avec succès');
            this.router.navigate(['../../'], { relativeTo: this.activatedRoute})
          },
        }),
        catchError((err) => {
          this.toastr.error(err);
          return throwError(err);
        })
      )
      .subscribe();
  }

  onChangeCategory(event : any){
    this.CONTRACT_TYPE = (event.value as string).toLocaleLowerCase() == 'formelle' ?
       [...Data.FORMELLE_CONTRACT] : [...Data.INFORMELLE_CONTRACT]
  }

  private async fileToBase64() {
    return !!this.INSERTION.value.tracking_after.justification
      ?._files
      ? await this.photoService.pdfToBase64(
          this.INSERTION.value.tracking_after.justification
            ._files[0]
        )
      : '';
  }
}
