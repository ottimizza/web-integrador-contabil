import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';

import { AuthenticationService } from '@app/authentication/authentication.service';
import { Lancamento } from '@shared/models/Lancamento';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { Empresa } from '@shared/models/Empresa';
import { PostFormatRule } from '@shared/models/Rule';

const BASE_URL = environment.storageBaseUrl;

@Injectable({ providedIn: 'root' })
export class LancamentoService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  public getLancamentos(page: number, b: Empresa, tipoLancamento: string, tipoMovimento: number): Observable<GenericPageableResponse<Lancamento>> {
    // const url
    // = `${BASE_URL}/api/v1/lancamentos?cnpjEmpresa=${b.cnpj}&pageIndex=${page}&tipoConta=0&tipoLancamento=${tipoLancamento}&tipoMovimento=${tipoMovimento}`;
    const url = `${BASE_URL}/api/v1/lancamentos?cnpjEmpresa=${b.cnpj}&pageIndex=${page}` // &tipoConta=0`;
    return this.http.get<GenericPageableResponse<Lancamento>>(url, this._headers);
  }

  public getByRule(rules: PostFormatRule[], e: Empresa): Observable<GenericPageableResponse<Lancamento>> {
    const url = `${BASE_URL}/api/v1/lancamentos/regras?cnpjEmpresa=${e.cnpj}&tipoConta=0`;
    return this.http.post<GenericPageableResponse<Lancamento>>(url, rules, this._headers);
  }

  public getByRulePaginated(rules: PostFormatRule[], e: Empresa, page: number) {
    const url = `${BASE_URL}/api/v1/lancamentos/regras?cnpjEmpresa=${e.cnpj}&pageIndex=${page}&tipoConta=0`;
    return this.http.post<GenericPageableResponse<Lancamento>>(url, rules, this._headers);
  }

  public ignoreLancamento(lancamento: Lancamento): Observable<Lancamento> {
    const url = `${BASE_URL}/api/v1/lancamentos/${lancamento.id}/ignorar`;
    return this.http.post<Lancamento>(url, {}, this._headers);
  }

  public saveAsDePara(lancamento: Lancamento, account: string): Observable<Lancamento> {
    const url = `${BASE_URL}/api/v1/lancamentos/${lancamento.id}/depara?contaMovimento=${account}`;
    return this.http.post<Lancamento>(url, {}, this._headers);
  }

  private get _headers() {
    const headers = this.authService.getAuthorizationHeaders();
    return { headers };
  }

}

