import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Checklist, ChecklistAnswer } from '@shared/models/Checklist';
import { ChecklistService } from '@app/http/checklist.service';
import { ToastService } from '@shared/services/toast.service';
import { ArrayUtils } from '@shared/utils/array.utils';
import { Script } from '@shared/models/Script';

@Component({
  selector: 'script-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {

  @Input() checklist: Checklist;
  @Input() scriptId: number;

  @Output() completed = new EventEmitter<Script>();

  importantInfos: string;
  notImportantInfos: string;

  isFinished = false;

  answers: ChecklistAnswer[] = [];

  constructor(
    private service: ChecklistService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.importantInfos = this.checklist.observacoes.filter(obs => obs.importante)
      .map(obs => obs.descricao)
      .join(' ');
    this.notImportantInfos = this.checklist.observacoes.filter(obs => !obs.importante)
      .map(obs => obs.descricao)
      .join(' ');
  }

  public onQuestionOk(event: ChecklistAnswer) {
    this.apply(event);
    this.isFinished = this.finished();
  }

  public apply(answer: ChecklistAnswer) {
    const valid = (answer.resposta !== null && answer.resposta !== undefined && answer.resposta !== '');
    const index = this.answers.map(a => a.perguntaId).indexOf(answer.perguntaId);
    if (index < 0 && valid) {
      this.answers.push(answer);
    } else if (index >= 0 && !valid) {
      this.answers.splice(index, 1);
    } else if (valid) {
      this.answers[index] = answer;
    }
  }

  public finished() {
    const want = ArrayUtils.reduce(this.checklist.grupos.map(group => group.perguntas.map(question => question.id)));
    const have = this.answers.map(answer => answer.perguntaId);

    let ok = true;

    want.forEach(w => {
      if (!have.includes(w)) {
        ok = false;
      }
    });

    have.forEach(h => {
      if (!want.includes(h)) {
        ok = false;
      }
    });

    return ok;
  }

  public submit() {
    this.isFinished = this.finished();
    if (this.isFinished) {
      this.toast.showSnack('Registrando respostas...');
      this.service.sendAnswers(this.scriptId, this.answers).subscribe(result => {
        this.toast.show('Respostas registradas com sucesso!', 'success');
        this.completed.emit(result.record);
      });
    }
  }

}
