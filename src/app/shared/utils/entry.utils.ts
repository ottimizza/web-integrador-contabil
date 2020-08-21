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
      dataMovimento:       'Data',
      documento:           'Documento',
      descricao:           'Fornecedor / Cliente',
      portador:            'Banco',
      tipoPlanilha:        'Tipo da Planilha',
      contaMovimento:      'Conta',
      valorOriginal:       'Valor',
      complemento01:       'Complemento 1',
      complemento02:       'Complemento 2',
      complemento03:       'Complemento 3',
      complemento04:       'Complemento 4',
      complemento05:       'Complemento 5',
      competencia:         'Competência Atual',
      competenciaAnterior: 'Competência Anterior',
      nomeArquivo:         'Nome do Arquivo',
      labelComplemento01:  'Rótulo do Complemento 1',
      labelComplemento02:  'Rótulo do Complemento 2',
      labelComplemento03:  'Rótulo do Complemento 3',
      labelComplemento04:  'Rótulo do Complemento 4',
      labelComplemento05:  'Rótulo do Complemento 5',
      contaSugerida:       'Conta(s) Sugerida(s)',
      tipoLancamento:      'Tipo do Lançamento',
      tipoMovimento:       'Tipo do Movimento',
      nenhum:              '*'
    };

    if (reference.tipoLancamento === 1) {
      labels.descricao = 'Fornecedor';
    } else if (reference.tipoLancamento === 2) {
      labels.descricao = 'Cliente';
    }
    if (reference.labelComplemento01) {
      labels.complemento01 = reference.labelComplemento01;
    }
    if (reference.labelComplemento02) {
      labels.complemento02 = reference.labelComplemento02;
    }
    if (reference.labelComplemento03) {
      labels.complemento03 = reference.labelComplemento03;
    }
    if (reference.labelComplemento04) {
      labels.complemento04 = reference.labelComplemento04;
    }
    if (reference.labelComplemento05) {
      labels.complemento05 = reference.labelComplemento05;
    }

    return labels[from] || from;
  }

}
