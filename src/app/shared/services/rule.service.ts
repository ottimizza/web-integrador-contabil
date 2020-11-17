import { Injectable } from '@angular/core';
import { environment } from '@env';
import { RuleCreateFormat, PostFormatRule, Rule } from '@shared/models/Rule';
import { Observable } from 'rxjs';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { CompleteRule } from '@shared/models/CompleteRule';
import { GenericResponse } from '@shared/models/GenericResponse';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { ProposedRulesService } from '@app/http/proposed-rules/proposed-rules.service';

const BASE_URL = `${environment.serviceUrl}`;

@Injectable({
  providedIn: 'root'
})
export class RuleService extends ProposedRulesService {

  // constructor(private http: HttpHandlerService) { }

  createRule(rule: RuleCreateFormat): Observable<any> {
    return this.http.post<GenericResponse<CompleteRule>>(`${BASE_URL}/api/v1/regras`, rule, 'Falha ao criar regra!');
  }

  getAllIds(cnpjEmpresa: string, cnpjContabilidade: string, tipoLancamento: number) {
    const url = `${BASE_URL}/api/v1/salesforce/id?cnpjEmpresa=${cnpjEmpresa}&tipoLancamento=${tipoLancamento}&cnpjContabilidade=${cnpjContabilidade}`;
    return this.http.get<number[]>(url, 'Falha ao obter lista completa de regras!');
  }

  clone(id: number) {
    const url = `${BASE_URL}/api/v1/regras/${id}`;
    return this.http.post<GenericResponse<CompleteRule>>(url, {}, 'Falha ao clonar regra');
  }

  exportById(id: number) {
    const url = `${BASE_URL}/api/v1/salesforce/patch/${id}`;
    return this.http.patch(url, {}, 'Falha ao exportar regra!');
  }

  get(searchCriteria: any): Observable<GenericPageableResponse<CompleteRule>> {
    const url = `${BASE_URL}/api/v1/regras`;
    return this.http.get<GenericPageableResponse<any>>([url, searchCriteria], 'Falha ao obter regras!');
  }

  changePosition(rule: CompleteRule) {
    const url = `${BASE_URL}/api/v1/regras/${rule.id}/posicao`;
    return this.http.put(url, { posicao: rule.posicao }, 'Falha ao alterar posição da regra!');
  }


  delete(id: number) {
    const url = `${BASE_URL}/api/v1/regras/${id}`;
    return this.http.delete(url, 'Falha ao excluir regra!');
  }

  update(id: number, rule: { regras: PostFormatRule[], contaMovimento: string }) {
    const url = `${BASE_URL}/api/v1/regras/${id}`;
    return this.http.put<GenericResponse<CompleteRule>>(url, rule, 'Falha ao atualizar regra!');
  }

  /**
   * @deprecated
   */
  moveToTop(id: number) {
    const url = `${BASE_URL}/api/v1/regras/${id}/posicao/inicio`;
    return this.http.put(url, {}, 'Falha ao mover regra para o início!');
  }

  /**
   * @deprecated
   */
  moveToBottom(id: number) {
    const url = `${BASE_URL}/api/v1/regras/${id}/posicao/final`;
    return this.http.put(url, {}, 'Falha ao mover regra para o final!');
  }
}
