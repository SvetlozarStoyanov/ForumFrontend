import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appNameNotTaken]',
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: NameNotTakenDirective
    }
  ],
  standalone: true
})
export class NameNotTakenDirective implements Validator {
  @Input('appNameNotTaken') names: string[] = [];
  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const nameTaken = this.names.includes(control.value);
    console.log(nameTaken);

    return nameTaken ? { forbidden: true } : null;
  }


}
