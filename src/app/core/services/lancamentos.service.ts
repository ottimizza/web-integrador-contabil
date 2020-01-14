import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { environment } from '@env';
import { Lancamento } from '@shared/models/Lancamento';
import { ImportacaoLancamentosRequest } from '@shared/models/ImportacaoLancamentosRequest';

const BASE_URL = environment.storageBaseUrl;

@Injectable({ providedIn: 'root' })
export class LancamentoService {

    constructor(private http: HttpClient, private authService: AuthenticationService) { }

    public getLancamentos(): Observable<ImportacaoLancamentosRequest> {
      return this.http.get<ImportacaoLancamentosRequest>(BASE_URL + '/api/v1/lancamentos', this._headers);
    }

    public ignorarLancamento(lancamento: Lancamento): Observable<any> {
      const url = BASE_URL + '/api/v1/lancamentos/' + lancamento.idRoteiro + '/ignorar';
      return this.http.post(url, lancamento, this._headers);
    }

    private get _headers() {
      const headers = this.authService.getAuthorizationHeaders();
      return {headers};
    }

  }
