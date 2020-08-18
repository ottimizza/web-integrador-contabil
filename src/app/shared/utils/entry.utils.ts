export class EntryUtils {

  public static fromTo(from: string, reference: { tipoLancamento?: number } = {}) {
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
      contaSugerida:       'Conta(s) Sugerida(s)'
    };

    if (reference.tipoLancamento === 1) {
      labels.descricao = 'Fornecedor';
    } else if (reference.tipoLancamento === 2) {
      labels.descricao = 'Cliente';
    }

    return labels[from];
  }

}
