import { Injectable } from '@angular/core';
import { ChecklistService } from '@app/http/checklist.service';
import { Checklist, ChecklistAnswer } from '@shared/models/Checklist';
import { ArrayUtils } from '@shared/utils/array.utils';

@Injectable({
  providedIn: 'root'
})
export class ChecklistLogicService {

  public answer(checklist: Checklist, currentAnswer: ChecklistAnswer, oldAnswers: ChecklistAnswer[]) {
    const valid = (currentAnswer.resposta !== null && currentAnswer.resposta !== undefined && currentAnswer.resposta !== '');

    if (valid) {
      const answers = this._answer(checklist, currentAnswer);
      oldAnswers.push(...answers);
    } else {
      const index = oldAnswers.map(a => a.perguntaId).indexOf(currentAnswer.perguntaId);
      if (index >= 0) {
        oldAnswers.splice(index, 1);
      }
    }

    const oldQuestionsIds = oldAnswers.map(oa => oa.perguntaId);
    const newAnswers = oldAnswers.filter((value, index) => {
      const lastIndex = oldQuestionsIds.lastIndexOf(value.perguntaId);
      return lastIndex === index;
    });

    return newAnswers;

  }

  private _answer(checklist: Checklist, answer: ChecklistAnswer) {
    let answers = [answer];
    const questions = ArrayUtils.flat(checklist.grupos.map(g => g.perguntas));
    const group = checklist.grupos.filter(grupo => grupo.perguntas.map(pergunta => pergunta.id).includes(answer.perguntaId))[0];
    const question = group.perguntas.filter(pergunta => pergunta.id === answer.perguntaId)[0];
    // const children = !!question.perguntasRelacionadas
    //                  ? group.perguntas.filter(pergunta => question.perguntasRelacionadas.includes(pergunta.id))
    //                  : [];
    const children = !!question.perguntasRelacionadas
                     ? questions.filter(q => question.perguntasRelacionadas.includes(q.id))
                     : [];

    if (children.length && question.opcoesResposta?.length && answer.resposta === question.opcoesResposta[0].valor) {
      answers = answers.concat(children.map(child => ({
          perguntaId: child.id,
          resposta: !!child.opcoesResposta?.length
                    ? child.opcoesResposta[child.opcoesResposta.length - 1].valor
                    : 'Não se aplica',
          roteiroId: answer.roteiroId,
          observacoes: null
      })));
    }

    return answers;
  }

}
