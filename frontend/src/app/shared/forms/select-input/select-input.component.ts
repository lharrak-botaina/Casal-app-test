import { Component, EventEmitter, Input, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
    selector: 'app-select-input',
    templateUrl: './select-input.component.html',
    styleUrls: ['./select-input.component.scss'],
    standalone: false
})
export class SelectInputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() options : any[] | string[] = []
  @Input() multiple : boolean = false;
  @Input() isGrouped : boolean = false;
  @Input() isObservable : boolean = false;
  @Input() optionDisplay : string = 'name';
  @Input() displayDefaultOption : boolean = false;
  @Input() deselectValue : boolean = true;
  @Input() textTransform : 'titlecase' | 'uppercase' | 'lowercase' | 'none' = 'titlecase';
  @Input() bold : boolean = false;
  @Output() valueChange = new EventEmitter();

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  optionValue(selectedValue){
    if(selectedValue == 'Oui') return true;
    else if(selectedValue == 'Non') return false;

    return selectedValue;
  }

  valueChanged(value){
    this.valueChange.emit(value)
  }
}
