import { SpreadsheetDef, SpreadsheetMap, ISpreadsheetMap } from './SpreadsheetMap';
import { isDefined } from '@angular/compiler/src/util';
import { SpreadSheetMapIndexation } from './SpreadsheetMapIndexation';

export class ProtoSpreadsheetMap implements ISpreadsheetMap {

  public dataMovimento?: SpreadsheetDef[];
  public documento?: SpreadsheetDef[];
  public descricao?: SpreadsheetDef[];
  public portador?: SpreadsheetDef[];
  public centroCusto?: SpreadsheetDef[];
  public tipoPlanilha?: SpreadsheetDef[];
  public valorOriginal?: SpreadsheetDef[];
  public valorPago?: SpreadsheetDef[];
  public valorJuros?: SpreadsheetDef[];
  public valorDesconto?: SpreadsheetDef[];
  public valorMulta?: SpreadsheetDef[];
  public complemento01?: SpreadsheetDef[];
  public complemento02?: SpreadsheetDef[];
  public complemento03?: SpreadsheetDef[];
  public complemento04?: SpreadsheetDef[];
  public complemento05?: SpreadsheetDef[];

  public build(reference: SpreadSheetMapIndexation) {
    const builder = new SpreadsheetMap();
    Object.keys(this).forEach(key => {
      if (this.verifyField(key)) {
        builder[key] = this.getReference(reference, key);
      }
    });
    return builder;
  }

  private verifyField(key: string) {
    const field = this[key];
    return isDefined(field) && Array.isArray(field);
  }

  private getReference(ref: any, key: string) {
    const field = this[key];
    const index = ref[key];
    if (isDefined(index) && typeof index === 'number') {
      return field[index];
    }
    console.error(`It was not possible to parse the ProtoSpreadsheetMap with key ${key}:`, ref);
    return field[0];
  }

}
