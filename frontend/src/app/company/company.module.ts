import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YouthResumesComponent } from './youth-resumes/youth-resumes.component';
import { CompanyRoutingModule } from './company-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CompanyFilterYouthComponent } from './youth-resumes/company-filter-youth/company-filter-youth.component';
import { CompanyYoungDetailsComponent } from './company-young-details/company-young-details.component';
import { CompanyAddJobComponent } from './jobs/company-add-job/company-add-job.component';
import { ColaborationTypeComponent } from './dialogs/colaboration-type/colaboration-type.component';
import { CompanyListJobComponent } from './jobs/company-list-job/company-list-job.component';
import { CompanyDetailJobComponent } from './jobs/company-detail-job/company-detail-job.component';
import { CompanyEditJobComponent } from './jobs/company-edit-job/company-edit-job.component';
import { CompanyArchiveJobComponent } from './jobs/company-archive-job/company-archive-job.component';


@NgModule({
  declarations: [
    YouthResumesComponent,
    CompanyFilterYouthComponent,
    CompanyYoungDetailsComponent,
    CompanyAddJobComponent,
    ColaborationTypeComponent,
    CompanyListJobComponent,
    CompanyDetailJobComponent,
    CompanyEditJobComponent,
    CompanyArchiveJobComponent
  ],
  imports: [CommonModule, CompanyRoutingModule, SharedModule],
})
export class CompanyModule {}
