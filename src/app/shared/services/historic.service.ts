import { Injectable } from '@angular/core';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { Empresa } from '@shared/models/Empresa';
import { Observable } from 'rxjs';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { FormattedHistoric } from '@shared/models/Historic';

const BASE_URL = environment.storageBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class HistoricService {

  constructor(private _http: HttpClient, private _auth: AuthenticationService) { }

  getHistoric(empresa: Empresa, conta: string, tipoLancamento: number): any {
    const url = `${BASE_URL}/api/v1/historicos?cnpjEmpresa=${empresa.cnpj}&contaMovimento=${conta}&tipoLancamento=${tipoLancamento}`;
    return this._http.get<GenericPageableResponse<any>>(url, this._headers);
  }

  createHistoric(historic: FormattedHistoric): Observable<any> {
    const url = `${BASE_URL}/api/v1/historicos`;
    return this._http.post(url, historic, this._headers);
  }

  export(id: number, historico: FormattedHistoric) {
    const url = `${BASE_URL}/api/v1/salesforce/historico/${id}`;
    return this._http.patch(url, historico, this._headers);
  }

  private get _headers() {
    const headers = this._auth.getAuthorizationHeaders();
    return { headers };
  }

}
