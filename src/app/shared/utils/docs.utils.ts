export class CNPJUtils {

  static cleanMask(cnpj: string): string {
    return cnpj.replace(/[^0-9]/g, '');
  }

  static applyMask(cnpj: string): string {
    cnpj = CNPJUtils.cleanMask(cnpj);
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3\/\$4\-\$5');
  }

  static isValid(cnpj: string): boolean {
    cnpj = CNPJUtils.cleanMask(cnpj);

    if (cnpj.length !== 14) { return false; }

    let base: string = cnpj.substring(0, 12);
    let dv: string = cnpj.substring(12);

    let sum = 0;
    let index = 5;
    for (let i = index; i < 7; i++) {
      if (index === 7) {
        break;
      }
      for (let j = 0; j < (index + 7); j++) {
        sum += +base[j] * i;
        i = (i === 2) ? 9 : (i - 1);
      }
      const verificationDigit: number = (sum % 11 < 2) ? 0 : (11 - (sum % 11));
      base += verificationDigit;
      if (verificationDigit !== +dv[index - 5]) {
        return false;
      }
      i = index;
      index++;
      sum = 0;
    }

    return true;
  }

}
