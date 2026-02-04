import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AddAssociationComponent } from './associations/add-association/add-association.component';
import { SharedModule } from '../shared/shared.module';
import { ListAssociationComponent } from './associations/list-association/list-association.component';
import { AssociationFilterComponent } from './associations/list-association/association-filter/association-filter.component';
import { DetailsAssociationComponent } from './associations/details-association/details-association.component';
import { ProfileAssociationComponent } from './associations/details-association/profile-association/profile-association.component';
import { InfoAssociationComponent } from './associations/details-association/info-association/info-association.component';
import { InfoTipComponent } from './associations/details-association/info-tip/info-tip.component';
import { EditAssociationComponent } from './associations/edit-association/edit-association.component';
import { EditAssociationPasswordComponent } from './associations/edit-association/edit-association-password/edit-association-password.component';
import { EditAssociationPhotosComponent } from './associations/edit-association/edit-association-photos/edit-association-photos.component';
import { DeleteAssociationComponent } from './associations/delete-association/delete-association.component';
import { AddCompanyComponent } from './companies/add-company/add-company.component';
import { ListCompanyComponent } from './companies/list-company/list-company.component';
import { CompanyFilterComponent } from './companies/list-company/company-filter/company-filter.component';
import { DetailsCompanyComponent } from './companies/details-company/details-company.component';
import { ProfileCompanyComponent } from './companies/details-company/profile-company/profile-company.component';
import { PersonContactedCompanyComponent } from './companies/details-company/person-contacted-company/person-contacted-company.component';
import { EditCompanyComponent } from './companies/edit-company/edit-company.component';
import { DeleteCompanyComponent } from './companies/delete-company/delete-company.component';
import { ListJobComponent } from './jobs/list-job/list-job.component';
import { DetailsJobComponent } from './jobs/details-job/details-job.component';
import { EditJobComponent } from './jobs/edit-job/edit-job.component';
import { ArchiveJobComponent } from './jobs/archive-job/archive-job.component';
import { AddPassworkComponent } from './passworks/add-passwork/add-passwork.component';
import { ListPassworkComponent } from './passworks/list-passwork/list-passwork.component';
import { PassworkFilterComponent } from './passworks/list-passwork/passwork-filter/passwork-filter.component';
import { DetailsPassworkComponent } from './passworks/details-passwork/details-passwork.component';
import { EditPassworkComponent } from './passworks/edit-passwork/edit-passwork.component';
import { EditPassworkTrainingModulesComponent } from './passworks/edit-passwork/edit-passwork-training-modules/edit-passwork-training-modules.component';
import { EditPassworkTrainingPlanningComponent } from './passworks/edit-passwork/edit-passwork-training-planning/edit-passwork-training-planning.component';
import { ArchivePassworkComponent } from './passworks/archive-passwork/archive-passwork.component';
import { ListYoungAdminComponent } from './youth/list-young-admin/list-young-admin.component';
import { YoungAdminFilterComponent } from './youth/list-young-admin/young-admin-filter/young-admin-filter.component';
import { DeleteYoungComponent } from './youth/delete-young/delete-young.component';
import { AdminReportComponent } from './report/report.component';
import { EditCompanyPasswordComponent } from './companies/edit-company/edit-company-password/edit-company-password.component';
import { EditCompanyLogoComponent } from './companies/edit-company/edit-company-logo/edit-company-logo.component';
import { PrintCenterComponent } from './print-center/print-center.component';
import { AddDocumentComponent } from './print-center/add-document/add-document.component';
import { AdminNotificationComponent } from './admin-notification/admin-notification.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddAssociationComponent,
    ListAssociationComponent,
    AssociationFilterComponent,
    DetailsAssociationComponent,
    ProfileAssociationComponent,
    InfoAssociationComponent,
    InfoTipComponent,
    EditAssociationComponent,
    EditAssociationPasswordComponent,
    EditAssociationPhotosComponent,
    DeleteAssociationComponent,
    AddCompanyComponent,
    ListCompanyComponent,
    CompanyFilterComponent,
    DetailsCompanyComponent,
    ProfileCompanyComponent,
    PersonContactedCompanyComponent,
    EditCompanyComponent,
    DeleteCompanyComponent,
    ListJobComponent,
    DetailsJobComponent,
    EditJobComponent,
    ArchiveJobComponent,
    AddPassworkComponent,
    ListPassworkComponent,
    PassworkFilterComponent,
    DetailsPassworkComponent,
    EditPassworkComponent,
    EditPassworkTrainingModulesComponent,
    EditPassworkTrainingPlanningComponent,
    ArchivePassworkComponent,
    ListYoungAdminComponent,
    YoungAdminFilterComponent,
    DeleteYoungComponent,
    AdminReportComponent,
    EditCompanyPasswordComponent,
    EditCompanyLogoComponent,
    PrintCenterComponent,
    AddDocumentComponent,
    AdminNotificationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
