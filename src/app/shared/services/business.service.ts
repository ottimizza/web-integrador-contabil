import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { Empresa } from '@shared/models/Empresa';
import { HttpHandlerService } from '@app/services/http-handler.service';

const BASE_URL = environment.storageBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private _http: HttpHandlerService) { }

  getBusiness(business: string): Observable<GenericPageableResponse<Empresa>> {
    const url = `${BASE_URL}/api/v1/empresas?razaoSocial=${business}&tipo=2`;
    return this._http.get<GenericPageableResponse<Empresa>>(url, 'Falha ao obter empresas clientes!');
  }

  getByErpCode(erp: string): Observable<GenericPageableResponse<Empresa>> {
    const url = `${BASE_URL}/api/v1/empresas?codigoERP=${erp}&tipo=2`;
    return this._http.get<GenericPageableResponse<Empresa>>(url, 'Falha ao obter empresas clientes!');
  }


}
