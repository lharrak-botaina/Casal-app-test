import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

@Component({
    selector: 'app-date-input',
    templateUrl: './date-input.component.html',
    styleUrls: ['./date-input.component.scss'],
    standalone: false
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() label: string;
  currentYear = new Date().getFullYear();
  defaultMaxDate = new Date(this.currentYear + 1000, 11, 31);

  @Input() maxDate : Date = this.defaultMaxDate;


  constructor(@Self() public ngControl: NgControl, private dateAdapter: DateAdapter<Date>) {
    this.ngControl.valueAccessor = this;
    this.dateAdapter.setLocale('fr-FR'); 
  }

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

}
