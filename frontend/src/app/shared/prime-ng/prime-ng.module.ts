import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MultiSelectModule,
    DropdownModule,
    PaginatorModule
  ],
  exports : [
    MultiSelectModule,
    DropdownModule,
    PaginatorModule
  ]
})
export class PrimeNgModule { }
