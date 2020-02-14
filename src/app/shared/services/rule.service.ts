import { Injectable } from '@angular/core';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { RuleCreateFormat, PostFormatRule } from '@shared/models/Rule';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { CompleteRule } from '@shared/models/CompleteRule';

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

  delete(id: number) {
    const url = `${BASE_URL}/api/v1/regras/${id}`;
    return this._http.delete(url, this._headers);
  }

  update(id: number, rule: { regras: PostFormatRule[], contaMovimento: string }) {
    const url = `${BASE_URL}/api/v1/regras/${id}`;
    return this._http.put(url, rule, this._headers);
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
