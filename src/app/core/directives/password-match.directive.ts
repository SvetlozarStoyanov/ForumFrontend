import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: PasswordMatchDirective
    }],
  standalone: true
})
export class PasswordMatchDirective implements Validator {
  @Input('appPasswordMatch') passwordToCompareWith = ''
  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    console.log(control.value);
    console.log(this.passwordToCompareWith);

    return control.value !== this.passwordToCompareWith ? { passwordMissmatch: true } : null;
  }

}
