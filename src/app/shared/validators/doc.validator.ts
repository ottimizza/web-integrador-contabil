import { AbstractControl } from '@angular/forms';
import { DocUtils } from '@shared/utils/docs.utils';

export function appDocValidator(control: AbstractControl) {
  const value = control.value;
  return !!value && DocUtils.validateCPForCNPJ(value)
         ? null
         : { message: 'The document is not valid', expected: 'CPF/CNPJ', obtained: value };
}
