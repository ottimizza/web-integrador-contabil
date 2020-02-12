import { Injectable } from '@angular/core';
import { Rule } from '@shared/models/Rule';
import { Lancamento } from '@shared/models/Lancamento';

@Injectable({ providedIn: 'root' })
export class RuleApplierService {

  apply(rule: Rule, records: Lancamento[]) {
    records.forEach(l => {

      records = this._partialApply(records, records.indexOf(l), rule.complemento01, l.complemento01);
      records = this._partialApply(records, records.indexOf(l), rule.complemento02, l.complemento02);
      records = this._partialApply(records, records.indexOf(l), rule.complemento03, l.complemento03);
      records = this._partialApply(records, records.indexOf(l), rule.complemento04, l.complemento05);
      records = this._partialApply(records, records.indexOf(l), rule.complemento05, l.complemento05);
      records = this._partialApply(records, records.indexOf(l), rule.descricao, l.descricao);
      records = this._partialApply(records, records.indexOf(l), rule.documento, l.documento);
      records = this._partialApply(records, records.indexOf(l), rule.nomeArquivo, l.nomeArquivo);
      records = this._partialApply(records, records.indexOf(l), rule.portador, l.portador);

    });

    return records;
  }

  private _partialApply(records: Lancamento[], position: number, conditions: string[], value: string) {
    if (conditions && conditions.length && value) {
      if (conditions.includes(value)) {
        records.splice(position, 1);
      } else {
        value.split(' ').forEach(word => {
          if (conditions.includes(word)) {
            records.splice(position, 1);
          }
        });
      }
    }
    return records;
  }


}
