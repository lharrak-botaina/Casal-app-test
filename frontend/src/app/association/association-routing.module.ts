import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociationGuard } from '../core/guards/association.guard';
import { CvGeneratorComponent } from '../cv-generator/cv-generator.component';
import { AssociationJobsDetailsComponent } from './association-jobs/association-jobs-details/association-jobs-details.component';
import { AssociationJobsComponent } from './association-jobs/association-jobs.component';
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
            component : ListYoungComponent
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
        path : 'stats',
        component : StatsComponent
      },
      {
        path : 'notification',
        component : NotificationComponent
      },
      {
        path : 'jobs',
        children : [
          {
            path : '',
            component : AssociationJobsComponent
          },
          {
            path : ':id',
            component : AssociationJobsDetailsComponent
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
