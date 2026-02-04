import { CompanyListJobComponent } from './jobs/company-list-job/company-list-job.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsAssociationComponent } from '../admin/associations/details-association/details-association.component';
import { CompanyGuard } from '../core/guards/company.guard';
import { CompanyYoungDetailsComponent } from './company-young-details/company-young-details.component';
import { CompanyAddJobComponent } from './jobs/company-add-job/company-add-job.component';
import { YouthResumesComponent } from './youth-resumes/youth-resumes.component';
import { CompanyDetailJobComponent } from './jobs/company-detail-job/company-detail-job.component';
import { CompanyEditJobComponent } from './jobs/company-edit-job/company-edit-job.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [CompanyGuard],
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
            component : YouthResumesComponent
          },
          {
            path: ':id',
            children : [
              {
                path : '',
                component : CompanyYoungDetailsComponent
              },
              {
                path : 'association/:id',
                component :DetailsAssociationComponent
              }
            ]
          },
        ],
      },
      {
        path: 'job',
        children: [
          {
            path : '',
            component : CompanyListJobComponent
          },
          {
            path: 'add',
            component : CompanyAddJobComponent
          },
          {
            path: ':id',
            component: CompanyDetailJobComponent,
          },
          {
            path: ':id/edit',
            component: CompanyEditJobComponent,
          }
        ],
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
