import { Injectable } from '@angular/core';
import { CompleteRule } from '@shared/models/CompleteRule';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { RuleService } from '@shared/services/rule.service';
import { ToastService } from '@shared/services/toast.service';
import { RuleCreateFormat } from '@shared/models/Rule';

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
    } else if (previousIndex !== currentIndex) {
      rules[previousIndex].posicao = rules[currentIndex].posicao;

      moveItemInArray(rules, previousIndex, currentIndex);
      this.changePosition(element);
      rules = this.syncPositions(rules);

      element = rules[currentIndex];

    }
    return rules;
  }

  public async clone(cloningEvent: { rule: RuleCreateFormat; position: number }, rules: CompleteRule[]) {
    const rs = await this.ruleService.createRule(cloningEvent.rule).toPromise();
    const rule: CompleteRule = rs.record;
    rule.posicao = cloningEvent.position;

    rules.push(rule);
    rules = rules.sort((a, b) => a.posicao - b.posicao);
    this.changePosition(rule, 'clonada');
    rules = this.syncPositions(rules);

    return rules;
  }

  private async changePosition(rule: CompleteRule, verb = 'movida') {
    await this.ruleService.changePosition(rule).toPromise();
    this.toastService.show(`Regra ${verb} com sucesso!`, 'success');
  }

  private syncPositions(rules: CompleteRule[]) {
    return rules.map((value, index) => {
      value.posicao = index;
      return value;
    });
  }

}
