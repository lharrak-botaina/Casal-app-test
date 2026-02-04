import { ListAssociationComponent } from './associations/list-association/list-association.component';
import { AdminGuard } from './../core/guards/admin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAssociationComponent } from './associations/add-association/add-association.component';
import { DetailsAssociationComponent } from './associations/details-association/details-association.component';
import { EditAssociationComponent } from './associations/edit-association/edit-association.component';
import { AddCompanyComponent } from './companies/add-company/add-company.component';
import { ListCompanyComponent } from './companies/list-company/list-company.component';
import { DetailsCompanyComponent } from './companies/details-company/details-company.component';
import { EditCompanyComponent } from './companies/edit-company/edit-company.component';
import { AddJobComponent } from './jobs/add-job/add-job.component';
import { ListJobComponent } from './jobs/list-job/list-job.component';
import { DetailsJobComponent } from './jobs/details-job/details-job.component';
import { EditJobComponent } from './jobs/edit-job/edit-job.component';
import { AddPassworkComponent } from './passworks/add-passwork/add-passwork.component';
import { ListPassworkComponent } from './passworks/list-passwork/list-passwork.component';
import { DetailsPassworkComponent } from './passworks/details-passwork/details-passwork.component';
import { EditPassworkComponent } from './passworks/edit-passwork/edit-passwork.component';
import { ListYoungAdminComponent } from './youth/list-young-admin/list-young-admin.component';
import { DetailsYoungComponent } from '../association/youth/details-young/details-young.component';
import { EditYoungComponent } from '../association/youth/edit-young/edit-young.component';
import { AddYoungInsertionComponent } from '../association/youth/edit-young/add-young-insertion/add-young-insertion.component';
import { AdminReportComponent } from './report/report.component';
import { HomeComponent } from './home/home.component';
import { CvGeneratorComponent } from '../cv-generator/cv-generator.component';
import { PrintCenterComponent } from './print-center/print-center.component';
import { AddDocumentComponent } from './print-center/add-document/add-document.component';
import { AdminNotificationComponent } from './admin-notification/admin-notification.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path : "home",
        component : HomeComponent
      },
      {
        path: 'association',
        children : [
          {
            path: '',
            component : ListAssociationComponent
          },
          {
            path: 'add',
            component: AddAssociationComponent,
          },
          {
            path: ':id',
            component: DetailsAssociationComponent,
          },
          {
            path: ':id/edit',
            component: EditAssociationComponent,
          }
        ]
      },
      {
        path: 'company',
        children : [
          {
            path: '',
            component: ListCompanyComponent,
          },
          {
            path: 'add',
            component: AddCompanyComponent,
          },
          {
            path: ':id',
            component: DetailsCompanyComponent,
          },
          {
            path: ':id/edit',
            component: EditCompanyComponent,
          }
        ]
      },
      {
        path: 'job',
        children : [
          {
            path: '',
            component: ListJobComponent,
          },
          {
            path: 'add',
            component: AddJobComponent,
          },
          {
            path: ':id',
            component: DetailsJobComponent,
          },
          {
            path: ':id/edit',
            component: EditJobComponent,
          }
        ]
      },
      {
        path: 'young',
        children : [
          {
            path: '',
            component: ListYoungAdminComponent,
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
        ]
      },
      {
        path: 'passwork',
        children : [
          {
            path: '',
            component: ListPassworkComponent,
          },
          {
            path: 'add',
            component: AddPassworkComponent,
          },
          {
            path: ':id',
            component: DetailsPassworkComponent,
          },
          {
            path: ':id/edit',
            component: EditPassworkComponent,
          }
        ]
      },
      {
        path: 'reports',
        component: AdminReportComponent,
      },      
      {
        path: 'print',
        children : [
          {
            path: '',
            component: PrintCenterComponent,
          },
          {
            path: 'add',
            component: AddDocumentComponent,
          }
        ]
      },
      {
        path: 'notification',
        component: AdminNotificationComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
