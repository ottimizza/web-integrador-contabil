type SpreadsheetDef = { coluna: string, valor: string }[];

export class SpreadsheetMap {
  // tslint:disable: typedef-whitespace
  public dataMovimento?: SpreadsheetDef;
  public documento?:     SpreadsheetDef;
  public descricao?:     SpreadsheetDef;
  public portador?:      SpreadsheetDef;
  public centroCusto?:   SpreadsheetDef;
  public tipoPlanilha?:  SpreadsheetDef;
  public valorOriginal?: SpreadsheetDef;
  public valorPago?:     SpreadsheetDef;
  public valorJuros?:    SpreadsheetDef;
  public valorDesconto?: SpreadsheetDef;
  public valorMulta?:    SpreadsheetDef;
  public complemento01?: SpreadsheetDef;
  public complemento02?: SpreadsheetDef;
  public complemento03?: SpreadsheetDef;
  public complemento04?: SpreadsheetDef;
  public complemento05?: SpreadsheetDef;

  public colunas: string[];

  constructor(builder: any) {
    Object.keys(builder).forEach(key => this[key] = builder[key]);
  }
}
