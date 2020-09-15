import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChecklistAnswer, ChecklistInputType, ChecklistQuestion } from '@shared/models/Checklist';
import { momentjs } from '@shared/utils/moment';

@Component({
  selector: 'checklist-item',
  templateUrl: './checklist-item.component.html',
  styleUrls: ['./checklist-item.component.scss']
})
export class ChecklistItemComponent implements AfterViewInit {

  @Input()
  public question: ChecklistQuestion;
  @Input()
  public scriptId: number;

  @Output()
  public ok = new EventEmitter<ChecklistAnswer>();

  public type = ChecklistInputType;
  public ctrl = new FormControl();

  public observation = new FormControl();

  private get value() {
    const value = this.ctrl.value;
    const type = this.type;

    switch (this.question.tipoInput) {
      case type.SELECT:      return value.valor;
      case type.MULT_SELECT: return value.map(val => val.valor);
      case type.DATE:        return momentjs(value).format('YYYY-MM-DD');
      default:               return value;
    }
  }

  public submit() {
    this.ok.emit({ perguntaId: this.question.id, resposta: this.value, observacoes: this.observation.value, roteiroId: this.scriptId });
  }

  public parse = (src: any) => src.descricao;

  ngAfterViewInit(): void {
    if (this.question.tipoInput === ChecklistInputType.CHECKBOX || this.question.tipoInput === ChecklistInputType.DATE) {
      this.submit();
    }
  }
}
