import { Builder } from './Builder';

export interface ISpreadsheetMap {
  dataMovimento?: unknown;
  documento?: unknown;
  descricao?: unknown;
  portador?: unknown;
  centroCusto?: unknown;
  tipoPlanilha?: unknown;
  valorOriginal?: unknown;
  valorPago?: unknown;
  valorJuros?: unknown;
  valorDesconto?: unknown;
  valorMulta?: unknown;
  complemento01?: unknown;
  complemento02?: unknown;
  complemento03?: unknown;
  complemento04?: unknown;
  complemento05?: unknown;
}

export class SpreadsheetDef {
  public campo: string;
  public valor: string;
  public coluna: string;
}

export class SpreadsheetMap implements ISpreadsheetMap {

  public dataMovimento: SpreadsheetDef;
  public documento: SpreadsheetDef;
  public descricao: SpreadsheetDef;
  public portador: SpreadsheetDef;
  public centroCusto: SpreadsheetDef;
  public tipoPlanilha: SpreadsheetDef;
  public valorOriginal: SpreadsheetDef;
  public valorPago: SpreadsheetDef;
  public valorJuros: SpreadsheetDef;
  public valorDesconto: SpreadsheetDef;
  public valorMulta: SpreadsheetDef;
  public complemento01: SpreadsheetDef;
  public complemento02: SpreadsheetDef;
  public complemento03: SpreadsheetDef;
  public complemento04: SpreadsheetDef;
  public complemento05: SpreadsheetDef;

  public static builder() {
    return Builder<SpreadsheetMap>();
  }

}
