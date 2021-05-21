export enum LayoutIntegrationType {
  EXTRATOS,
  CARTOES,
  ERPS
}

export class Layout {
  descricaoDocumento: string;
  icone: string;
  id: number;
  idSalesForce: string;
  linkReferencia: string;
  pagamentos: boolean;
  recebimentos: boolean;
  tags: string[];
  tipoArquivo: string;
  tipoIntegracao: LayoutIntegrationType;
}


