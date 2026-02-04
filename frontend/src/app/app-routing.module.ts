import { ReportsComponent } from './reports/reports.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RedirectGuard } from './core/guards/redirect.guard';

const routes: Routes = [
  {
    path : 'signIn',
    // canActivate : [ RedirectGuard ],
    component : SignInComponent
  },
  { 
    path : 'casal',
    canActivate : [ AuthGuard ],
    loadChildren : () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { 
    path : 'association',
    canActivate : [ AuthGuard ],
    loadChildren : () => import('./association/association.module').then(m => m.AssociationModule)
  },
  { 
    path : 'company',
    canActivate : [ AuthGuard ],
    loadChildren : () => import('./company/company.module').then(m => m.CompanyModule)
  },
  { 
    path : 'stats',
    canActivate : [ AuthGuard ],
    component : ReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
