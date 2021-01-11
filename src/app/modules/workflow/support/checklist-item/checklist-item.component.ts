import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ChecklistAnswer, ChecklistInputType, ChecklistQuestion } from '@shared/models/Checklist';
import { FormControl } from '@angular/forms';

import { momentjs } from '@shared/utils/moment';

@Component({
  selector: 'checklist-item',
  templateUrl: './checklist-item.component.html',
  styleUrls: ['./checklist-item.component.scss']
})
export class ChecklistItemComponent implements AfterViewInit, OnChanges {

  @Input()
  public question: ChecklistQuestion;

  @Input()
  public scriptId: number;

  @Input()
  public answer: string;

  @Input()
  public disable: boolean;

  @Output()
  public ok = new EventEmitter<ChecklistAnswer>();

  @Output()
  public details = new EventEmitter<{ id: number, observation: string }>();

  public type = ChecklistInputType;
  public ctrl = new FormControl();

  public observation = new FormControl();

  private get value() {
    const value = this.ctrl.value;
    const type = this.type;

    switch (this.question.tipoInput) {
      case type.CHECKBOX:    return !!value;
      case type.SELECT:      return value.valor;
      case type.MULT_SELECT: return value.map(val => val.valor).join(';');
      case type.DATE:        return momentjs(value).format('YYYY-MM-DD');
      default:               return value;
    }
  }

  public submit() {
    this.ok.emit({ perguntaId: this.question.id, resposta: this.value, observacoes: this.observation.value, roteiroId: this.scriptId });
  }

  public sendDetails() {
    this.details.emit({ id: this.question.id, observation: this.observation.value });
  }

  public parse = (src: any) => src.descricao;

  ngAfterViewInit(): void {
    if (this.question.tipoInput === ChecklistInputType.CHECKBOX || this.question.tipoInput === ChecklistInputType.DATE) {
      this.submit();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {
      if (changes.hasOwnProperty(key)) {
        if (key === 'answer' && this.answer) {
          if (this.question.tipoInput === ChecklistInputType.SELECT) {
            const value = this.question.opcoesResposta.filter(opt => opt.valor === this.answer)[0];
            this.ctrl.setValue(value);
          } else if (this.question.tipoInput === ChecklistInputType.MULT_SELECT) {
            const value = this.answer.split(';');
            const values = this.question.opcoesResposta.filter(opt => value.includes(opt.valor as string));
            this.ctrl.setValue(values);
          } else {
            this.ctrl.setValue(this.answer);
          }
        } else if (key === 'disable') {
          if (this.disable && this.ctrl.enabled) {
            this.ctrl.disable();
          } else if (!this.disable && this.ctrl.disabled) {
            this.ctrl.enable();
          }
        }
      }
    }
  }

}
