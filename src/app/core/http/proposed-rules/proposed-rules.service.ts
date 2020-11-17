import { filter, map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '@env';

import { HttpHandlerService } from '@app/services/http-handler.service';
import { GenericResponse } from '@shared/models/GenericResponse';
import { RxEvent } from '@app/services/rx-event.service';
import { ProposedRule } from '@shared/models/Rule';
import { User } from '@shared/models/User';

const BASE_URL = `${environment.serviceUrl}/api/v1/regras`;

@Injectable({
  providedIn: 'root'
})
export class ProposedRulesService {

  private readonly PROPOSED_RULES_KEY = 'event-proposed-rules';

  private proposedRules: string[];

  constructor(
    private event: RxEvent,
    protected http: HttpHandlerService
  ) { }

  public async proposeRules(entryId: number, accountingFilter?: boolean) {
    const result = await this._suggestedRule(entryId, !!accountingFilter).toPromise();
    if (result.record && result.record.camposRegras?.length) {
      this.proposedRules = result.record.camposRegras;
      return result.record.contaMovimento ?? '';
    }
    this.proposedRules = [];
    return '';
  }

  public clean() {
    this.proposedRules = null;
    this.onReconstructionCompleted();
  }

  public ruleProposed(value: string, handler: (value: unknown) => void) {
    this.event.use(
      [filter(result => result.includes(value)), map(result => result.filter(rule => rule === value)[0]), take(1)],
      this.PROPOSED_RULES_KEY,
      handler
    );
  }

  public onReconstructionCompleted() {
    this.event.next(this.PROPOSED_RULES_KEY, this.proposedRules);
  }

  private _suggestedRule(entryId: number, accountingFilter: boolean) {
    const url = `${BASE_URL}/sugerir/${entryId}`;
    const searchCriteria = { busca: accountingFilter ? 0 : 1, cnpjContabilidade: User.fromLocalStorage().organization.cnpj };
    return this.http.get<GenericResponse<ProposedRule>>([url, searchCriteria], 'Falha ao obter regra sugerida');
  }
}
