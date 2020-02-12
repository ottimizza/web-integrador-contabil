import { Injectable } from '@angular/core';
import { Rule } from '@shared/models/Rule';
import { Lancamento } from '@shared/models/Lancamento';

@Injectable({ providedIn: 'root' })
export class RuleApplierService {

  apply(rules: Rule[], records: Lancamento[]) {
    rules.forEach(r => {
      records.forEach(l => {


        records = this._partialApply(records, records.indexOf(l), r.complemento01, l.complemento01);
        records = this._partialApply(records, records.indexOf(l), r.complemento02, l.complemento02);
        records = this._partialApply(records, records.indexOf(l), r.complemento03, l.complemento03);
        records = this._partialApply(records, records.indexOf(l), r.complemento04, l.complemento05);
        records = this._partialApply(records, records.indexOf(l), r.complemento05, l.complemento05);
        records = this._partialApply(records, records.indexOf(l), r.descricao, l.descricao);
        records = this._partialApply(records, records.indexOf(l), r.documento, l.documento);
        records = this._partialApply(records, records.indexOf(l), r.nomeArquivo, l.nomeArquivo);
        records = this._partialApply(records, records.indexOf(l), r.portador, l.portador);


      });
    });

    return records;
  }

  private _partialApply(records: Lancamento[], position: number, conditions: string[], value: string) {
    if (conditions && conditions.length && value) {
      value.split(' ').forEach(word => {
        if (conditions.includes(word)) {
          records.splice(position, 1);
        } else {
          conditions.forEach(cond => {
            if (cond === word || cond === value) {
              records.splice(position, 1);
            }
          });
        }
      });
    }
    return records;
  }

}
