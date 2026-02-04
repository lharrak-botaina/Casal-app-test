import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RbacAllowDirective } from './rbac-allow.directive';



@NgModule({
  declarations: [
    RbacAllowDirective
  ],
  imports: [
    CommonModule
  ],
  exports : [
    RbacAllowDirective
  ]
})
export class DirectiveModule { }
