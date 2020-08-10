import { Injectable } from '@angular/core';
import { SalesforceService } from '@app/http/salesforce.service';
import { RuleService } from '@shared/services/rule.service';
import { HistoricService } from '@shared/services/historic.service';

@Injectable({ providedIn: 'root' })
export class ExportService {

  constructor(
    private salesforce: SalesforceService,
    private rules: RuleService,
    private historic: HistoricService
  ) {}

  public async exportAllRules(
    cnpjEmpresa: string,
    cnpjContabilidade: string,
    tipoLancamento: number,
    callbackFn: (percentage: number) => void) {

    const rules = await this.rules.getAllIds(cnpjEmpresa, cnpjContabilidade, tipoLancamento).toPromise();

    for (let i = 0; i < rules.length; i++) {
      await this.salesforce.exportRule(rules[i]).toPromise();
      const percentage = Math.round((i + 1 / rules.length) * 100);
      console.log(percentage);
      callbackFn(percentage);
    }

    return true;
  }

  public async exportAllHistorics(
    cnpjEmpresa: string,
    cnpjContabilidade: string,
    tipoLancamento: number,
    callbackFn: (percentage: number) => void) {

    const historics = await this.historic.getAll({ cnpjEmpresa, cnpjContabilidade, tipoLancamento }).toPromise().then(rs => rs.records);

    for (let i = 0; i < historics.length; i++) {
      await this.salesforce.exportHistoric(historics[i].id, historics[i]).toPromise();
      const percentage = Math.round((i + 1 / historics.length) * 100);
      callbackFn(percentage);
    }

    return true;
  }

}
