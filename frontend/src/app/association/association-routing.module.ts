import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociationGuard } from '../core/guards/association.guard';
import { CvGeneratorComponent } from '../cv-generator/cv-generator.component';
import { AssociationJobsDetailsComponent } from './association-jobs/association-jobs-details/association-jobs-details.component';
import { AssociationJobsComponent } from './association-jobs/association-jobs.component';
import { AssociationAddJobComponent } from './association-jobs/association-add-job/association-add-job.component';
import { AssociationEditJobComponent } from './association-jobs/association-edit-job/association-edit-job.component';
import { AssociationListCompanyComponent } from './association-companies/association-list-company/association-list-company.component';
import { AssociationAddCompanyComponent } from './association-companies/association-add-company/association-add-company.component';
import { AssociationDetailsCompanyComponent } from './association-companies/association-details-company/association-details-company.component';
import { AssociationEditCompanyComponent } from './association-companies/association-edit-company/association-edit-company.component';
import { NotificationComponent } from './notification/notification.component';
import { StatsComponent } from './stats/stats.component';
import { AddYoungComponent } from './youth/add-young/add-young.component';
import { DetailsYoungComponent } from './youth/details-young/details-young.component';
import { AddYoungInsertionComponent } from './youth/edit-young/add-young-insertion/add-young-insertion.component';
import { EditYoungComponent } from './youth/edit-young/edit-young.component';
import { ListYoungComponent } from './youth/list-young/list-young.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AssociationGuard],
    children: [
      {
        path: '',
        redirectTo: 'young',
        pathMatch: 'full',
      },
      {
        path: 'young',
        children: [
          {
            path: '',
            component: ListYoungComponent
          },
          {
            path: 'add',
            component: AddYoungComponent,
          },
          {
            path: ':id',
            component: DetailsYoungComponent,
          },
          {
            path: ':id/edit',
            component: EditYoungComponent,
          },
          {
            path: ':id/edit/insertion',
            component: AddYoungInsertionComponent,
          },
          {
            path: ':id/cv',
            component: CvGeneratorComponent,
          }
        ],
      },
      {
        path: 'stats',
        component: StatsComponent
      },
      {
        path: 'notification',
        component: NotificationComponent
      },
      {
        path: 'jobs',
        children: [
          {
            path: '',
            component: AssociationJobsComponent
          },
          {
            path: 'add',
            component: AssociationAddJobComponent
          },
          {
            path: ':id',
            component: AssociationJobsDetailsComponent
          },
          {
            path: ':id/edit',
            component: AssociationEditJobComponent
          }
        ]
      },
      {
        path: 'companies',
        children: [
          {
            path: '',
            component: AssociationListCompanyComponent
          },
          {
            path: 'add',
            component: AssociationAddCompanyComponent
          },
          {
            path: ':id',
            component: AssociationDetailsCompanyComponent
          },
          {
            path: ':id/edit',
            component: AssociationEditCompanyComponent
          }
        ]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssociationRoutingModule {}
