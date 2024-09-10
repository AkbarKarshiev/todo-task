import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordsMismatch(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.parent?.get(passwordKey)?.value;
    const confirmPassword = control.parent?.get(confirmPasswordKey)?.value;

    if (password !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  };
}
