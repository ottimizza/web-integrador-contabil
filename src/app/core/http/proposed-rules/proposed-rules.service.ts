import { delay, filter, map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '@env';

import { HttpHandlerService } from '@app/services/http-handler.service';
import { GenericResponse } from '@shared/models/GenericResponse';
import { RxEvent } from '@app/services/rx-event.service';
import { ProposedRule } from '@shared/models/Rule';
import { User } from '@shared/models/User';
import { ArrayUtils } from '@shared/utils/array.utils';
import { BehaviorSubject, Subject } from 'rxjs';

const BASE_URL = `${environment.serviceUrl}/api/v1/regras`;

@Injectable({
  providedIn: 'root'
})
export class ProposedRulesService {

  private readonly PROPOSED_RULES_KEY = 'event-proposed-rules';
  private readonly RECONSTRUCTION_ENDED_KEY = 'event-reconstruction-ended';

  private proposedRules: string[];
  public alreadyUsedRules: string[] = [];

  constructor(
    private event: RxEvent,
    protected http: HttpHandlerService
  ) { }

  public onReconstructionEnded() {
    this.event.next(this.RECONSTRUCTION_ENDED_KEY, true);
  }

  public reconstructionEnded(handler: any) {
    this.event.use([take(1), delay(200)], this.RECONSTRUCTION_ENDED_KEY, handler);
  }

  public async proposeRules(entryId: number, accountingFilter?: boolean) {
    const result = await this._suggestedRule(entryId, !!accountingFilter).toPromise();
    this.alreadyUsedRules = [];
    if (result.record && result.record.camposRegras?.length) {
      this.proposedRules = result.record.camposRegras;
      return { id: result.record.id, account: result.record.contaMovimento ?? '' };
    }
    this.proposedRules = [];
    return { id: result?.record?.id || null, account: '' };
  }

  public proposedRulesIncludes(value: string, separators: string[], array = this.proposedRules) {
    return ArrayUtils.flat(array.map(val => ArrayUtils.magicSplit(val.toUpperCase(), ...separators))).includes(value.toUpperCase());
  }

  public clean() {
    this.proposedRules = [];
    this.onReconstructionCompleted();
  }

  public ruleProposed(value: string, separators: string[], handler: (value: string) => void) {
    this.event.use(
      [
        filter((result: string[]) => this.proposedRulesIncludes(value, separators, result)),
        take(1),
        map((result: string[]) => {
          const rule = result.filter(a =>  a.toUpperCase().includes(value.toUpperCase()))[0];
          if (!this.proposedRules) {
            this.proposedRules = result;
          }
          return rule;
        }),
        delay(150)
      ],
      this.PROPOSED_RULES_KEY,
      handler
    );
  }

  public onReconstructionCompleted() {
    this.event.next(this.PROPOSED_RULES_KEY, this.proposedRules);
  }

  public onRuleUsed(rule: string) {
    let index = -1;
    this.proposedRules.forEach((proposedRule, i) => {
      if (proposedRule.includes(rule)) {
        index = i;
      }
    });
    if (index > -1) {
      this.proposedRules[index] = this.proposedRules[index].replace(rule, '').trim();
    }
    // this.proposedRules = this.proposedRules.filter(pr => !!pr);
  }

  private _suggestedRule(entryId: number, accountingFilter: boolean) {
    const url = `${BASE_URL}/sugerir/${entryId}`;
    const searchCriteria = { busca: accountingFilter ? 0 : 1, cnpjContabilidade: User.fromLocalStorage().organization.cnpj };
    return this.http.get<GenericResponse<ProposedRule>>([url, searchCriteria], 'Falha ao obter regra sugerida');
  }


}
