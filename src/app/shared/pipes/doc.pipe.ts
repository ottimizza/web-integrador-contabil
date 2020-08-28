import { Pipe, PipeTransform } from '@angular/core';
// import { CNPJUtils } from '@shared/utils/doc.utils';

@Pipe({
  name: 'doc'
})
export class DocPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // if (!value) { return value; }

    // // Validação de CNPJ.
    // const isCNPJ = CNPJUtils.isValid(value);

    // return isCNPJ ? CNPJUtils.applyMask(value) : value;
    return false;
  }

}
