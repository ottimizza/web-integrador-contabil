import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';

import { AuthenticationService } from '@app/authentication/authentication.service';
import { Lancamento } from '@shared/models/Lancamento';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { Empresa } from '@shared/models/Empresa';
import { PostFormatRule } from '@shared/models/Rule';
import { HttpHandlerService } from '@app/services/http-handler.service';

const BASE_URL = environment.serviceUrl;

@Injectable({ providedIn: 'root' })
export class LancamentoService {

  constructor(private http: HttpHandlerService) { }

  public getLancamentos(searchCriteria: any): Observable<GenericPageableResponse<Lancamento>> {
    const url = `${BASE_URL}/api/v1/lancamentos`;
    return this.http.get<GenericPageableResponse<Lancamento>>([url, searchCriteria], 'Falha ao obter lançamentos!');
  }

  public getPercentage(cnpjEmpresa: string, tipoMovimento: string) {
    const url = `${BASE_URL}/api/v1/lancamentos/porcentagem?cnpjEmpresa=${cnpjEmpresa}&tipoMovimento=${tipoMovimento}`;
    return this.http.get(url, 'Falha ao obter porcentagem de lançamentos concluídos!');
  }

  public skip(id: number): Observable<Lancamento> {
    const url = `${BASE_URL}/api/v1/lancamentos/${id}`;
    return this.http.patch<Lancamento>(url, { tipoConta: 4 }, 'Falha ao pular lançamento!');
  }

  public getByRule(rules: PostFormatRule[], e: Empresa): Observable<GenericPageableResponse<Lancamento>> {
    const url = `${BASE_URL}/api/v1/lancamentos/regras?cnpjEmpresa=${e.cnpj}&pageSize=1&ativo=true`;
    return this.http.post<GenericPageableResponse<Lancamento>>(url, rules, 'Falha ao obter lista de lançamentos afetados!');
  }

  public getByRulePaginated(rules: PostFormatRule[], e: Empresa, page: number) {
    const url = `${BASE_URL}/api/v1/lancamentos/regras?cnpjEmpresa=${e.cnpj}&pageIndex=${page}&tipoConta=0&ativo=true`;
    return this.http.post<GenericPageableResponse<Lancamento>>(url, rules, 'Falha ao obter pacote de lançamentos afetados');
  }

  public ignoreLancamento(lancamento: Lancamento): Observable<Lancamento> {
    const url = `${BASE_URL}/api/v1/lancamentos/${lancamento.id}/ignorar`;
    return this.http.post<Lancamento>(url, {}, 'Falha ao ignorar lançamento!');
  }

  public saveAsDePara(lancamento: Lancamento, account: string): Observable<Lancamento> {
    const url = `${BASE_URL}/api/v1/lancamentos/${lancamento.id}/depara?contaMovimento=${account}`;
    return this.http.post<Lancamento>(url, {}, 'Falha ao vincular lançamento a uma conta de fornecedor!');
  }

}
