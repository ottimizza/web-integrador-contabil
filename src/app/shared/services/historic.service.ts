import { Injectable } from '@angular/core';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { Empresa } from '@shared/models/Empresa';
import { Observable } from 'rxjs';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { FormattedHistoric } from '@shared/models/Historic';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { GenericResponse } from '@shared/models/GenericResponse';

const BASE_URL = environment.serviceUrl;

@Injectable({
  providedIn: 'root'
})
export class HistoricService {

  constructor(private _http: HttpHandlerService) { }

  public getHistoric(empresa: Empresa, conta: string, tipoLancamento: number): any {
    const url = `${BASE_URL}/api/v1/historicos?cnpjEmpresa=${empresa.cnpj}&contaMovimento=${conta}&tipoLancamento=${tipoLancamento}`;
    return this._http.get<GenericPageableResponse<any>>(url, 'Falha ao verificar a existência de histórico!');
  }

  public createHistoric(historic: FormattedHistoric): Observable<any> {
    const url = `${BASE_URL}/api/v1/historicos`;
    return this._http.post(url, historic, 'Falha ao criar histórico!');
  }

  public export(id: number, historico: FormattedHistoric) {
    const url = `${BASE_URL}/api/v1/salesforce/historico/${id}`;
    return this._http.patch(url, historico, 'Falha ao exportar histórico!');
  }

  public getAll(searchCriteria: any) {
    const url = `${BASE_URL}/api/v1/historicos/sf`;
    return this._http.get<GenericResponse<FormattedHistoric>>([url, searchCriteria], 'Falha ao obter lista de históricos!');
  }

}
