import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
    selector: 'app-file-input',
    templateUrl: './file-input.component.html',
    styleUrls: ['./file-input.component.scss'],
    standalone: false
})
export class FileInputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() accept = '.png, .jpeg, .jpg';
  @Input() disabled: boolean = false;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const value = { _files: Array.from(input.files) };
      this.onChange(value);
      this.ngControl.control?.setValue(value);
    } else {
      this.onChange(null);
      this.ngControl.control?.setValue(null);
    }
    this.onTouched();
  }

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
