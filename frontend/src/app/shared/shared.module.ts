import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { DirectiveModule } from '../core/directives/directives.module';
import { TextInputComponent } from './forms/text-input/text-input.component';
import { SelectInputComponent } from './forms/select-input/select-input.component';
import { DateInputComponent } from './forms/date-input/date-input.component';

import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { TimeagoModule } from 'ngx-timeago';
import { FileInputComponent } from './forms/file-input/file-input.component';
import { TextareaInputComponent } from './forms/textarea-input/textarea-input.component';
import { YoungCardComponent } from './components/young-card/young-card.component';
import { FooterComponent } from './footer/footer.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartOneComponent } from '../reports/pie-chart-one/pie-chart-one.component';
import { PieChartTwoComponent } from '../reports/pie-chart-two/pie-chart-two.component';
import { BasicStatsComponent } from '../reports/basic-stats/basic-stats.component';
import { YoungPersonalInfoDetailsComponent } from '../association/youth/details-young/young-personal-info-details/young-personal-info-details.component';
import { YoungSkillsAssessmentDetailsComponent } from '../association/youth/details-young/young-skills-assessment-details/young-skills-assessment-details.component';
import { YoungCapacityBuildingDetailsComponent } from '../association/youth/details-young/young-capacity-building-details/young-capacity-building-details.component';
import { YoungPassworkDetailsComponent } from '../association/youth/details-young/young-passwork-details/young-passwork-details.component';
import { RouterModule } from '@angular/router';
import { AddJobComponent } from '../admin/jobs/add-job/add-job.component';
import { JobFilterComponent } from '../admin/jobs/list-job/job-filter/job-filter.component';

@NgModule({
  declarations: [
    TextInputComponent,
    SelectInputComponent,
    DateInputComponent,
    FileInputComponent,
    TextareaInputComponent,
    YoungCardComponent,
    FooterComponent,
    PieChartOneComponent, 
    PieChartTwoComponent, 
    BasicStatsComponent,
    YoungPersonalInfoDetailsComponent,
    YoungSkillsAssessmentDetailsComponent,
    YoungCapacityBuildingDetailsComponent,
    YoungPassworkDetailsComponent,
    AddJobComponent,
    JobFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    DirectiveModule,
    PrimeNgModule,
    TimeagoModule.forRoot(),
    NgxChartsModule,
    RouterModule
  ],
  providers : [DatePipe],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    NgxSpinnerModule,
    ToastrModule,
    DirectiveModule,
    TextInputComponent,
    SelectInputComponent,
    DateInputComponent,
    // MaterialFileInputModule,
    PrimeNgModule,
    TimeagoModule,
    FileInputComponent,
    TextareaInputComponent,
    YoungCardComponent,
    FooterComponent,
    NgxChartsModule,
    PieChartOneComponent, 
    PieChartTwoComponent, 
    BasicStatsComponent,
    YoungPersonalInfoDetailsComponent,
    YoungSkillsAssessmentDetailsComponent,
    YoungCapacityBuildingDetailsComponent,
    YoungPassworkDetailsComponent,
    AddJobComponent,
    JobFilterComponent
  ],
})
export class SharedModule {}
