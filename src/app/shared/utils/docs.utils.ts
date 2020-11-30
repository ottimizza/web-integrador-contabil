export class DocUtils {

  static cleanMask(cnpj: string): string {
    return cnpj.replace(/[^0-9]/g, '');
  }

  static applyMask(cnpj: string): string {
    cnpj = this.cleanMask(cnpj);
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3\/\$4\-\$5');
  }

  static isValid(cnpj: string): boolean {
    cnpj = this.cleanMask(cnpj);

    if (cnpj.length !== 14) { return false; }

    let base: string = cnpj.substring(0, 12);
    const dv: string = cnpj.substring(12);

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

  public static format(cnpj: string): string {
    cnpj = cnpj.replace(/[^\d]*/g, '');

    if (this.validateCEICNO(cnpj)) {
      cnpj = cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{3})(\d{1})/,
        '$1.$2.$3.$4-$5'
      );
    } else if (this.validateCnpj(cnpj)) {
      cnpj = cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      );
    } else if (this.validateCpf(cnpj)) {
      cnpj = cnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
    }

    return cnpj;
  }

  public static validateCnpj(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]*/g, '');

    if (cnpj.length !== 14) {
      return false;
    }

    let base: string = cnpj.substring(0, 12);
    const dv: string = cnpj.substring(12);

    let sum = 0;
    let index = 5;
    for (let i = index; i < 7; i++) {
      if (index === 7) {
        break;
      }
      for (let j = 0; j < index + 7; j++) {
        sum += +base[j] * i;
        i = i === 2 ? 9 : i - 1;
      }
      const verificationDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      base += verificationDigit;
      if (+verificationDigit !== +dv[index - 5]) {
        return false;
      }
      i = index;
      index++;
      sum = 0;
    }

    return true;
  }

  public static validateCpf(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]*/g, '');

    const padLeft = (s: string, l: number, c = '0') => Array(l - String(s).length + 1).join(c) + s;

    if (cpf.length > 12) {
      return false;
    }
    let cpfValida = cpf;

    cpfValida = padLeft(cpfValida.replace(/[^\d]*/g, ''), 11);

    cpfValida = cpfValida.substring(0, 11);

    if (!cpf.length || cpfValida === '' || cpfValida.length > 11) {
      return false;
    }

    let base = cpfValida.substring(0, 9);
    const dv = cpfValida.substring(9);

    let sum = 0;
    for (let i = 9; i < 11; i++) {
      for (let j = 0; j < i; j++) {
        sum += +base[j] * (i + 1 - j);
      }
      const verificationDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      base += verificationDigit;
      if (verificationDigit !== +dv[i - 9]) {
        return false;
      }
      sum = 0;
    }

    return true;
  }

  public static validateCEICNO(cei: string) {
    cei = cei.replace(/[^\d]*/g, '');

    // CASO O CEI NÃO POSSUA 12 DIGITOS, É INVÁLIDO
    if (cei.length !== 12) {
      return false;
    }

    let somatoria = 0;
    const pesos = [7, 4, 1, 8, 5, 2, 1, 6, 3, 7, 4];
    for (let i = 0; i < 11; i++) {
      const digito = +cei.charAt(i);
      const peso = pesos[i];
      somatoria += digito * peso;
    }

    const len = somatoria.toString().length - 2;
    const dezena = somatoria.toString().substring(len).substring(0, 1);
    const unidade = somatoria - Math.floor(somatoria / 10) * 10;

    somatoria = +dezena + unidade;

    // UTILIZADO PARA PEGAR SOMENTE A UNIDADE
    if (somatoria > 9) {
      somatoria -= 10;
    }

    let digitoEncontrado = Math.abs(10 - somatoria);
    if (digitoEncontrado > 9) {
      digitoEncontrado -= 10;
    } // UTILIZADO PARA PEGAR SOMENTE A UNIDADE
    const digitoCEI = +cei.substring(11);

    if (digitoEncontrado === digitoCEI) {
      return true;
    } else {
      return false;
    }
  }

  public static validateCPForCNPJ(doc: string) {
    return this.validateCnpj(doc) || this.validateCpf(doc);
  }

}
