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
    let rules = ref.map(rule => rule);
    let element = rules[previousIndex];

    if (previousIndex !== currentIndex) {
      rules[previousIndex].posicao = rules[currentIndex].posicao;

      moveItemInArray(rules, previousIndex, currentIndex);
      rules = this.syncPositions(rules);

      element = rules[currentIndex];

      this.changePosition(element);
    }
    return rules;
  }

  public sendToEnd(ref: CompleteRule[], previousIndex: number, totalElements: number) {
    if (ref.length === totalElements) {
      return this.reorder(ref, previousIndex, totalElements - 1);
    }

    const rules = ref.map(item => item);
    const rule = rules[previousIndex];
    rule.posicao = totalElements;

    rules.splice(previousIndex, 1);
    this.changePosition(rule);

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
    return rules.map((value, index) => {
      value.posicao = index + 1;
      return value;
    });
  }

}
