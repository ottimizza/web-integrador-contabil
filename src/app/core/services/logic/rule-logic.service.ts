import { Injectable } from '@angular/core';
import { CompleteRule } from '@shared/models/CompleteRule';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { RuleService } from '@shared/services/rule.service';
import { ToastService } from '@shared/services/toast.service';
import { RuleCreateFormat } from '@shared/models/Rule';

export const ruleNumberError = () => {
  throw new Error('Não é possível trocar uma regra de posição com outra que tenha um número diferente de cláusulas!');
};

@Injectable({ providedIn: 'root' })
export class RuleLogicService {

  constructor(
    private ruleService: RuleService,
    private toastService: ToastService
  ) {}

  public reorder(ref: CompleteRule[], previousIndex: number, currentIndex: number) {
    currentIndex = currentIndex >= 0 ? currentIndex : 0;
    let rules = ref.map(rule => rule);
    let element = rules[previousIndex];

    if (element.regras.length !== rules[currentIndex].regras.length) {
      this.toastService.show('Você não pode trocar uma regra de posição com outra que tenha um número diferente de cláusulas!', 'warning');
      ruleNumberError();
    } else if (previousIndex !== currentIndex) {
      rules[previousIndex].posicao = rules[currentIndex].posicao;

      moveItemInArray(rules, previousIndex, currentIndex);
      rules = this.syncPositions(rules);

      element = rules[currentIndex];
      this.changePosition(element);
    }
    return rules;
  }

  public async clone(cloningEvent: { rule: RuleCreateFormat; position: number }, rules: CompleteRule[]) {
    const rs = await this.ruleService.createRule(cloningEvent.rule).toPromise();
    const rule: CompleteRule = rs.record;
    rule.posicao = cloningEvent.position;

    rules.push(rule);
    rules = rules.sort((a, b) => a.posicao - b.posicao);
    rules = this.syncPositions(rules);
    this.changePosition(rule, 'clonada');

    return rules;
  }

  private async changePosition(rule: CompleteRule, verb = 'movida') {
    await this.ruleService.changePosition(rule).toPromise();
    this.toastService.show(`Regra ${verb} com sucesso!`, 'success');
  }

  private syncPositions(rules: CompleteRule[]) {
    // Confirmar com o Lucas
    return rules.map((value, index) => {
      value.posicao = index;
      return value;
    });
  }

}
