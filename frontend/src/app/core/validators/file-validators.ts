import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom validator for maximum file size
 * @param maxSize Maximum file size in bytes
 * @returns Validator function
 */
export function MaxSizeValidator(maxSize: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const file = control.value instanceof File ? control.value : null;

    if (!file) {
      return null;
    }

    if (file.size > maxSize) {
      return {
        maxContentSize: {
          actualSize: file.size,
          maxSize: maxSize
        }
      };
    }

    return null;
  };
}
