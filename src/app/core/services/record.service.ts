import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { environment } from '@env';
import { ImportacaoLancamentosRequest } from '@shared/models/ImportacaoLancamentosRequest';
import { Lancamento } from '@shared/models/Record';

const BASE_URL = environment.storageBaseUrl;

@Injectable({ providedIn: 'root' })
export class RecordService {

    constructor(private http: HttpClient, private authService: AuthenticationService) { }

    public getRecords(): Observable<ImportacaoLancamentosRequest> {
      return this.http.get<ImportacaoLancamentosRequest>(BASE_URL + '/api/v1/lancamentos', this._headers);
    }

    public ignoreRecord(record: Lancamento): Observable<Lancamento> {
      const url = `${BASE_URL}/api/v1/lancamentos/${record.id}/ignorar`;
      return this.http.post<Lancamento>(url, {}, this._headers);
    }

    public saveAsDePara(record: Lancamento, account: string): Observable<Lancamento> {
      const url = `${BASE_URL}/api/v1/lancamentos/${record.id}/depara?contaMovimento=${account}`;
      return this.http.post<Lancamento>(url, {}, this._headers);
    }

    private get _headers() {
      const headers = this.authService.getAuthorizationHeaders();
      return {headers};
    }

  }
