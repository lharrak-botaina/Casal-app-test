import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssociationHomeComponent } from './association-home/association-home.component';
import { AddYoungComponent } from './youth/add-young/add-young.component';
import { AssociationRoutingModule } from './association-routing.module';
import { SharedModule } from '../shared/shared.module';
import { YoungPersonalInfoComponent } from './youth/add-young/young-personal-info/young-personal-info.component';
import { YoungSkillsAssessmentComponent } from './youth/add-young/young-skills-assessment/young-skills-assessment.component';
import { YoungCapacityBuildingComponent } from './youth/add-young/young-capacity-building/young-capacity-building.component';
import { YoungPassworkComponent } from './youth/add-young/young-passwork/young-passwork.component';
import { YoungInsertionComponent } from './youth/add-young/young-insertion/young-insertion.component';
import { ListYoungComponent } from './youth/list-young/list-young.component';
import { YoungFilterComponent } from './youth/list-young/young-filter/young-filter.component';
import { DetailsYoungComponent } from './youth/details-young/details-young.component';
import { YoungPersonalInfoDetailsComponent } from './youth/details-young/young-personal-info-details/young-personal-info-details.component';
import { YoungSkillsAssessmentDetailsComponent } from './youth/details-young/young-skills-assessment-details/young-skills-assessment-details.component';
import { YoungCapacityBuildingDetailsComponent } from './youth/details-young/young-capacity-building-details/young-capacity-building-details.component';
import { YoungPassworkDetailsComponent } from './youth/details-young/young-passwork-details/young-passwork-details.component';
import { YoungInsertionDetailsComponent } from './youth/details-young/young-insertion-details/young-insertion-details.component';
import { EditYoungComponent } from './youth/edit-young/edit-young.component';
import { EditYoungCapacityBuildingComponent } from './youth/edit-young/edit-young-capacity-building/edit-young-capacity-building.component';
import { EditYoungInsertionComponent } from './youth/edit-young/edit-young-insertion/edit-young-insertion.component';
import { EditYoungPassworkComponent } from './youth/edit-young/edit-young-passwork/edit-young-passwork.component';
import { EditYoungPersonalInfoComponent } from './youth/edit-young/edit-young-personal-info/edit-young-personal-info.component';
import { EditYoungSkillsAssessmentComponent } from './youth/edit-young/edit-young-skills-assessment/edit-young-skills-assessment.component';
import { EditPhotoDialogComponent } from './youth/edit-young/edit-photo-dialog/edit-photo-dialog.component';
import { EditYoungJustificationDialogComponent } from './youth/edit-young/edit-young-justification-dialog/edit-young-justification-dialog.component';
import { AddYoungInsertionComponent } from './youth/edit-young/add-young-insertion/add-young-insertion.component';
import { StatsComponent } from './stats/stats.component';
import { NotificationComponent } from './notification/notification.component';
import { AssociationJobsComponent } from './association-jobs/association-jobs.component';
import { AssociationJobsDetailsComponent } from './association-jobs/association-jobs-details/association-jobs-details.component';

@NgModule({
  declarations: [
    AssociationHomeComponent,
    AddYoungComponent,
    YoungPersonalInfoComponent,
    YoungSkillsAssessmentComponent,
    YoungCapacityBuildingComponent,
    YoungPassworkComponent,
    YoungInsertionComponent,
    ListYoungComponent,
    YoungFilterComponent,
    DetailsYoungComponent,
    YoungInsertionDetailsComponent,
    EditYoungComponent,
    EditYoungCapacityBuildingComponent,
    EditYoungInsertionComponent,
    EditYoungPassworkComponent,
    EditYoungPersonalInfoComponent,
    EditYoungSkillsAssessmentComponent,
    EditPhotoDialogComponent,
    EditYoungJustificationDialogComponent,
    AddYoungInsertionComponent,
    StatsComponent,
    NotificationComponent,
    AssociationJobsComponent,
    AssociationJobsDetailsComponent,
  ],
  imports: [CommonModule, AssociationRoutingModule, SharedModule],
})
export class AssociationModule {}
