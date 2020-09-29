export class FromToReference {
  tipoLancamento?: number;
  labelComplemento01?: string;
  labelComplemento02?: string;
  labelComplemento03?: string;
  labelComplemento04?: string;
  labelComplemento05?: string;
}

export class EntryUtils {

  public static fromTo(from: string, reference: FromToReference = {}): string {
    const labels = {
      DATAMOVIMENTO:       'Data',
      DOCUMENTO:           'Documento',
      DESCRICAO:           'Descrição',
      PORTADOR:            'Banco',
      TIPOPLANILHA:        'Tipo da Planilha',
      CONTAMOVIMENTO:      'Conta',
      VALORORIGINAL:       'Valor',
      COMPLEMENTO01:       'Complemento 1',
      COMPLEMENTO02:       'Complemento 2',
      COMPLEMENTO03:       'Complemento 3',
      COMPLEMENTO04:       'Complemento 4',
      COMPLEMENTO05:       'Complemento 5',
      COMPETENCIA:         'Competência Atual',
      COMPETENCIAANTERIOR: 'Competência Anterior',
      NOMEARQUIVO:         'Nome do Arquivo',
      LABELCOMPLEMENTO01:  'Rótulo do Complemento 1',
      LABELCOMPLEMENTO02:  'Rótulo do Complemento 2',
      LABELCOMPLEMENTO03:  'Rótulo do Complemento 3',
      LABELCOMPLEMENTO04:  'Rótulo do Complemento 4',
      LABELCOMPLEMENTO05:  'Rótulo do Complemento 5',
      CONTASUGERIDA:       'Conta(s) Sugerida(s)',
      TIPOLANCAMENTO:      'Tipo do Lançamento',
      TIPOMOVIMENTO:       'Tipo do Movimento',
      NENHUM:              '*'
    };

    if (reference.labelComplemento01) {
      labels.COMPLEMENTO01 = reference.labelComplemento01;
    }
    if (reference.labelComplemento02) {
      labels.COMPLEMENTO02 = reference.labelComplemento02;
    }
    if (reference.labelComplemento03) {
      labels.COMPLEMENTO03 = reference.labelComplemento03;
    }
    if (reference.labelComplemento04) {
      labels.COMPLEMENTO04 = reference.labelComplemento04;
    }
    if (reference.labelComplemento05) {
      labels.COMPLEMENTO05 = reference.labelComplemento05;
    }

    return labels[from.toUpperCase()] || from;
  }

}
