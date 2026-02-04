import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MultiSelectModule,
    DropdownModule
  ],
  exports : [
    MultiSelectModule,
    DropdownModule
  ]
})
export class PrimeNgModule { }
