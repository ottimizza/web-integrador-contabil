import { Injectable } from '@angular/core';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { Empresa } from '@shared/models/Empresa';
import { Observable } from 'rxjs';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { FormattedHistoric } from '@shared/models/Historic';
import { HttpHandlerService } from '@app/services/http-handler.service';

const BASE_URL = environment.storageBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class HistoricService {

  constructor(private _http: HttpHandlerService) { }

  getHistoric(empresa: Empresa, conta: string, tipoLancamento: number): any {
    const url = `${BASE_URL}/api/v1/historicos?cnpjEmpresa=${empresa.cnpj}&contaMovimento=${conta}&tipoLancamento=${tipoLancamento}`;
    return this._http.get<GenericPageableResponse<any>>(url, 'Falha ao verificar a existência de histórico!');
  }

  createHistoric(historic: FormattedHistoric): Observable<any> {
    const url = `${BASE_URL}/api/v1/historicos`;
    return this._http.post(url, historic, 'Falha ao criar histórico!');
  }

  export(id: number, historico: FormattedHistoric) {
    const url = `${BASE_URL}/api/v1/salesforce/historico/${id}`;
    return this._http.patch(url, historico, 'Falha ao exportar histórico!');
  }

}
