import { Injectable } from '@angular/core';
import { SalesforceService } from '@app/http/salesforce.service';
import { RuleService } from '@shared/services/rule.service';
import { HistoricService } from '@shared/services/historic.service';
import { Subject } from 'rxjs';

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

    // rules.forEach(async (ruleId, index) => {
    //   const success = await this.salesforce.exportRule(ruleId).toPromise();
    //   const percentage = (index + 1 / rules.length) * 100;
    //   callbackFn(percentage);
    // });
    for (let i = 0; i < rules.length; i++) {
      const success = await this.salesforce.exportRule(rules[i]).toPromise();
      const percentage = (i + 1 / rules.length) * 100;
      callbackFn(percentage);
    }

    return true;
  }

  public async exportAllHistorics(
    cnpjEmpresa: string,
    cnpjContabilidade: string,
    tipoLancamento: number,
    callbackFn: (percentage: number) => void) {

    const historics = await this.historic.getAll({ cnpjEmpresa, cnpjContabilidade, tipoLancamento }).toPromise();

    // historics.forEach(async (historic, index) => {
    //   const success = await this.salesforce.exportHistoric(historic.id, historic).toPromise();
    //   const percentage = (index + 1 / historics.length) * 100;
    //   callbackFn(percentage);
    // });
    for (let i = 0; i < historics.length; i++) {
      const success = await this.salesforce.exportHistoric(historics[i].id, historics[i]).toPromise();
      const percentage = (i + 1 / historics.length) * 100;
      callbackFn(percentage);
    }

    return true;
  }

}
