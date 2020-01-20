import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';

import { AuthenticationService } from '@app/authentication/authentication.service';
import { Lancamento } from '@shared/models/Lancamento';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';

const BASE_URL = environment.storageBaseUrl;

@Injectable({ providedIn: 'root' })
export class LancamentoService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  public getLancamentos(page: number): Observable<GenericPageableResponse<Lancamento>> {
    return this.http.get<GenericPageableResponse<Lancamento>>(BASE_URL + '/api/v1/lancamentos?pageIndex=' + page, this._headers);
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
