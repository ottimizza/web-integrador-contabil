export class DocumentDetectorUtils {

  public static detect(document: string) {

    if (/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/.test(document)) {
      return 'CNPJ';
    }
    if (/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/.test(document)) {
      return 'CPF';
    }

  }

}
