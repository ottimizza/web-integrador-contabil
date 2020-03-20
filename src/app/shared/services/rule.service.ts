import { Injectable } from '@angular/core';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { RuleCreateFormat, PostFormatRule } from '@shared/models/Rule';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { CompleteRule } from '@shared/models/CompleteRule';
import { GenericResponse } from '@shared/models/GenericResponse';

const BASE_URL = environment.storageBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class RuleService {

  constructor(private _http: HttpClient, private _auth: AuthenticationService) { }

  createRule(rule: RuleCreateFormat): Observable<any> {
    return this._http.post(`${BASE_URL}/api/v1/regras`, rule, this._headers);
  }

  get(searchCriteria: any): Observable<GenericPageableResponse<CompleteRule>> {
    const params = this.encode(searchCriteria);
    const url = `${BASE_URL}/api/v1/regras?${params}`;
    return this._http.get<GenericPageableResponse<any>>(url, this._headers);
  }

  changePosition(rule: CompleteRule) {
    const url = `${BASE_URL}/api/v1/regras/${rule.id}/posicao`;
    return this._http.put(url, { posicao: rule.posicao }, this._headers);
  }

  moveToTop(id: number) {
    const url = `${BASE_URL}/api/v1/regras/${id}/posicao/inicio`;
    return this._http.put(url, {}, this._headers);
  }

  moveToBottom(id: number) {
    const url = `${BASE_URL}/api/v1/regras/${id}/posicao/final`;
    return this._http.put(url, {}, this._headers);
  }

  // ! WORKING, BUT DEPRECATED
  // move(rule: CompleteRule) {
  //   const url = `${BASE_URL}/api/v1/regras/${rule.id}/alterar_posicao?cnpjEmpresa=${rule.cnpjEmpresa}&tipoLancamento=${rule.tipoLancamento}`;
  //   return this._http.put(url, { posicao: rule.posicao }, this._headers);
  // }

  delete(id: number) {
    const url = `${BASE_URL}/api/v1/regras/${id}`;
    return this._http.delete(url, this._headers);
  }

  update(id: number, rule: { regras: PostFormatRule[], contaMovimento: string }) {
    const url = `${BASE_URL}/api/v1/regras/${id}`;
    return this._http.put(url, rule, this._headers);
  }

  export(cnpjEmpresa: string, tipoLancamento: number): Observable<GenericResponse<undefined>> {
    const url = `${BASE_URL}/api/sf/importar?cnpjEmpresa=${cnpjEmpresa}&tipoLancamento=${tipoLancamento}`;
    return this._http.post<GenericResponse<undefined>>(url, {}, this._headers);
  }

  private get _headers() {
    const headers = this._auth.getAuthorizationHeaders();
    return { headers };
  }

  private encode(params: any): string {
    return Object.keys(params).map((key) => {
      return [key, params[key]].map(encodeURIComponent).join('=');
    }).join('&');
  }

}
