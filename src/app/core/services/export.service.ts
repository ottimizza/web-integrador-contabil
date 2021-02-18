import { Injectable } from '@angular/core';

import { HistoricService } from '@shared/services/historic.service';
import { SalesforceService } from '@app/http/salesforce.service';
import { RuleService } from '@shared/services/rule.service';
import { ToastService } from '@shared/services/toast.service';
import { TimeUtils } from '@shared/utils/time.utils';

@Injectable({ providedIn: 'root' })
export class ExportService {

  constructor(
    private salesforce: SalesforceService,
    private rules: RuleService,
    private historic: HistoricService,
    private toast: ToastService
  ) {}

  public async exportAllRules(
    cnpjEmpresa: string,
    cnpjContabilidade: string,
    tipoLancamento: number,
    callbackFn: (exported: number, total: number) => void) {

    const rules = await this.rules.getAllIds(cnpjEmpresa, cnpjContabilidade, tipoLancamento).toPromise();

    for (let i = 0; i < rules.length; i++) {
      await this.salesforce.exportRule(rules[i]).toPromise();
      callbackFn(i + 1, rules.length);
    }

    return true;
  }

  public async exportAllHistorics(
    cnpjEmpresa: string,
    cnpjContabilidade: string,
    tipoLancamento: number,
    callbackFn: (exported: number, total: number) => void) {

    const historics = await this.historic.getAll({ cnpjEmpresa, cnpjContabilidade, tipoLancamento }).toPromise().then(rs => rs.records);

    for (let i = 0; i < historics.length; i++) {
      await this.salesforce.exportHistoric(historics[i].id, historics[i]).toPromise();
      callbackFn(i + 1, historics.length);
    }

    return true;
  }

  public async exportAll(
    cnpjEmpresa: string,
    cnpjContabilidade: string,
    tipoLancamento: number,
    callbackFn: (exported: number, total: number) => void
  ) {
    this.toast.showSnack('Exportando regras, isto pode demorar um pouco...');
    await this.exportAllRules(cnpjEmpresa, cnpjContabilidade, tipoLancamento, callbackFn);

    this.toast.showSnack('Exportando históricos, isto pode demorar um pouco...');
    await this.exportAllHistorics(cnpjEmpresa, cnpjContabilidade, tipoLancamento, callbackFn);

    this.toast.show('Redirecionando para página de confirmação...');
    await TimeUtils.sleep(2000);
    const scriptId = 'a0A1C000011Z4iy';
    const company = 'OLYNTHO+OFTALMO.CENTER+-+EIRELI';
    const type = 'Contas+PAGAS';
    const url = `http://s1.ottimizza.com.br:8475/contabil-server/roteiro.jsp?idRoteiro=${scriptId}&codigoRoteiro=ROT-2020-1010483&empresa=${company}&tipo=${type}&path=Deploy"`;
    window.open(url, '_blank');
  }

}
