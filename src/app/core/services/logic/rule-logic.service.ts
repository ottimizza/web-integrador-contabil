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

  public async clone(ruleIdToBeClones: number, rules: CompleteRule[]) {
    let ref = rules.map(r => r);

    const result = await this.ruleService.clone(ruleIdToBeClones).toPromise();

    ref.push(result.record);
    ref = ref.sort((a, b) => a.posicao - b.posicao);

    this.successMessage('clonada');
    return this.syncPositions(ref);
  }

  public delete(rules: CompleteRule[], index: number) {
    rules.splice(index, 1);
    return this.syncPositions(rules);
  }

  private changePosition(rule: CompleteRule, verb = 'movida') {
    this.ruleService.changePosition(rule).subscribe(() => this.successMessage(verb));

  }

  private successMessage(message: string) {
    this.toastService.show(`Regra ${message} com sucesso!`, 'success');
  }

  private syncPositions(rules: CompleteRule[]) {
    return rules.map((rule, index) => {
      rule.posicao = index;
      return rule;
    });
  }

}
