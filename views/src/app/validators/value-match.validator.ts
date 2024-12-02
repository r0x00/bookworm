import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchValuesValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlToValidate = control.get(controlName);
    const matchingControl = control.get(matchingControlName);

    if (!controlToValidate || !matchingControl) {
      return null;
    }

    return controlToValidate.value === matchingControl.value ? null : { valuesDontMatch: true };
  };
};
