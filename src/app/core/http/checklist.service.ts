import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { environment } from '@env';

import { Checklist, ChecklistAnswer, ChecklistDetail, ChecklistQuestion } from '@shared/models/Checklist';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { GenericResponse } from '@shared/models/GenericResponse';
import { WorkflowService } from './workflow.service';
import { ScriptStatus } from '@shared/models/Script';

const BASE_URL = `${environment.serviceUrl}/api/v1/checklist`;

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(
    private http: HttpHandlerService,
    private workflowService: WorkflowService
  ) {}

  /**
   * @description Obtém o formulário da aba de Detalhamentos do Projeto
   * @param type Tipo do projeto (NÃO DO ROTEIRO), é definido pela API após o mapeamento da planilha
   */
  public fetch(type: number) {
    return this._fetchDefault(type)
    .pipe(map((result: any) => {
      result.record.perguntas[0].tipoInput = 1;
      result.record = Checklist.fromRequest(result.record);
      return result as GenericResponse<Checklist>;
    }));
  }

  /**
   * @description Registra as respostas do Checklist e imediatamente depois, altera o status do Roteiro
   */
  public sendAnswers(scriptId: number, answers: ChecklistAnswer[]) {
    const observables$ = answers.map(answer => this.sendUniqueAnswer(scriptId, answer));
    return combineLatest(observables$)
    .pipe(switchMap(() => this.workflowService.patch(scriptId, { status: ScriptStatus.AGUARDANDO_CONFIRMACAO, checkList: true })));
  }

  public sendUniqueAnswer(scriptId: number, answer: ChecklistAnswer) {
    answer.roteiroId = scriptId;
    const url = `${BASE_URL}/resposta`;
    return this.http.post(url, answer, 'Falha ao registrar resposta!');
  }

  /**
   * @description Obtem todas as perguntas e respostas
   * @param type Tipo do projeto (NÃO DO ROTEIRO), é definido pela API após o mapeamento da planilha
   * @param scriptId id do Roteiro
   */
  public getCompletedForm(type: number, scriptId: number) {
    return this._fetchDefault(type)
    .pipe(switchMap(checklist => {
      return combineLatest(checklist.record.perguntas.map(question => {
        return this.getAnswers({ roteiroId: scriptId, perguntaId: question.id });
      })).pipe(map(result => {
        const records = checklist.record.perguntas.map((question, index) => {
          const answer = result[index].records[0];
          const assign = Object.assign(question, answer);
          return assign;
        });
        return { records, message: 'OK', status: '200' } as GenericResponse<ChecklistQuestion & ChecklistAnswer>;
      }));
    }));
  }

  /**
   * @paginated
   * @param serachCriteria aceita pageIndex, pageSize e qualquer parâmetro de ChecklistAnswer
   */
  public getAnswers(serachCriteria: any) {
    const url = `${BASE_URL}/resposta`;
    return this.http.get<GenericPageableResponse<ChecklistAnswer>>([url, serachCriteria], 'Falha ao obter respostas!');
  }

  private _fetchDefault(type: number) {
    const url = `${BASE_URL}/${type}`;
    return this.http.get<GenericResponse<{ observacoes: ChecklistDetail[], perguntas: ChecklistQuestion[] }>>(url, 'Falha ao obter formulário de detalhes!');
  }
}
