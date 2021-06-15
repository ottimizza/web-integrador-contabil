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

  extentionIcon?: 'fa-file-csv' | 'fa-file-excel' | 'fa-file-pdf' | 'fa-file-alt' | 'fa-file-exclamation'; // Somente no front
}


