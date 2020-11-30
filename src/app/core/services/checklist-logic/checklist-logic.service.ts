import { Injectable } from '@angular/core';
import { Checklist, ChecklistAnswer, ChecklistQuestion } from '@shared/models/Checklist';
import { ArrayUtils } from '@shared/utils/array.utils';

@Injectable({
  providedIn: 'root'
})
export class ChecklistLogicService {

  public answer(checklist: Checklist, currentAnswer: ChecklistAnswer, oldAnswers: ChecklistAnswer[]) {
    const valid = (currentAnswer.resposta !== null && currentAnswer.resposta !== undefined && currentAnswer.resposta !== '');

    let questionsToDisable: ChecklistQuestion[] = [];
    let questionsToEnable: ChecklistQuestion[] = [];

    const data = this._map(checklist, currentAnswer);

    if (valid) {
      oldAnswers.push(...data.answers);
      questionsToDisable = data.disable ? data.children : [];
      questionsToEnable = data.disable ? [] : data.children;
    } else {
      const index = oldAnswers.map(a => a.perguntaId).indexOf(currentAnswer.perguntaId);
      if (index >= 0) {
        oldAnswers.splice(index, 1);
      }
      questionsToDisable = data.children;
    }

    const oldQuestionsIds = oldAnswers.map(oa => oa.perguntaId);
    const answers = oldAnswers.filter((value, index) => {
      const lastIndex = oldQuestionsIds.lastIndexOf(value.perguntaId);
      return lastIndex === index;
    });

    return { answers, questionsToDisable, questionsToEnable };
  }

  private _map(checklist: Checklist, answer: ChecklistAnswer) {
    let answers = [answer];
    const questions = ArrayUtils.flat(checklist.grupos.map(g => g.perguntas));
    const group = checklist.grupos.filter(grupo => grupo.perguntas.map(pergunta => pergunta.id).includes(answer.perguntaId))[0];
    const question = group.perguntas.filter(pergunta => pergunta.id === answer.perguntaId)[0];

    const children = !!question.perguntasRelacionadas
                     ? questions.filter(q => question.perguntasRelacionadas.includes(q.id))
                     : [];

    const disable = answer.resposta === question.opcoesResposta[0].valor;

    if (children.length && question.opcoesResposta?.length && disable) {
      answers = answers.concat(children.map(child => ({
          perguntaId: child.id,
          resposta: !!child.opcoesResposta?.length
                    ? child.opcoesResposta[child.opcoesResposta.length - 1].valor
                    : 'Não se aplica',
          roteiroId: answer.roteiroId,
          observacoes: null
      })));
    }
    return { answers, children, disable };
  }

}
