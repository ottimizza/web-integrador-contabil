import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ChecklistLogicService } from '@app/services/checklist-logic/checklist-logic.service';
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

  @Input()
  public checklist: Checklist;

  @Input()
  public scriptId: number;

  @Output()
  public completed = new EventEmitter<Script>();

  public importantInfos: string[];
  public notImportantInfos: string[];

  public isFinished = false;

  public answers: ChecklistAnswer[] = [];
  public disabledQuestions: number[] = [];

  constructor(
    private service: ChecklistService,
    private logic: ChecklistLogicService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.importantInfos = this.checklist.observacoes.filter(obs => obs.importante)
      .map(obs => obs.descricao);
    this.notImportantInfos = this.checklist.observacoes.filter(obs => !obs.importante)
      .map(obs => obs.descricao);
  }

  public onQuestionOk(event: ChecklistAnswer) {
    const data = this.logic.answer(this.checklist, event, this.answers);
    this.disabledQuestions = this.disabledQuestions.concat(data.questionsToDisable.map(question => question.id));
    this.disabledQuestions = this.disabledQuestions.filter(question => !data.questionsToEnable.map(q => q.id).includes(question));
    this.answers = data.answers;
    this.isFinished = this.finished();
  }

  public findAnswer(questionId: number) {
    const answer = this.answers.filter(a => a.perguntaId === questionId)[0];
    return answer?.resposta;
  }

  public finished() {
    const want = ArrayUtils.flat(this.checklist.grupos.map(group => group.perguntas.map(question => question.id)));
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
      });
    }
  }

}
