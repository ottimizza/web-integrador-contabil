import { Injectable } from '@angular/core';
import { environment } from '@env';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { Empresa } from '@shared/models/Empresa';

const BASE_URL = environment.storageBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(
    private _auth: AuthenticationService,
    private _http: HttpClient
  ) { }

  getBusiness(business: string): Observable<GenericPageableResponse<Empresa>> {
    return this._http.get<GenericPageableResponse<Empresa>>(`${BASE_URL}/api/v1/empresas?razaoSocial=${business}`, this._headers);
  }

  getByErpCode(erp: string): Observable<GenericPageableResponse<Empresa>> {
    const url = `${BASE_URL}/api/v1/empresas?codigoERP=${erp}`;
    return this._http.get<GenericPageableResponse<Empresa>>(url, this._headers);
  }

  private get _headers() {
    const headers = this._auth.getAuthorizationHeaders();
    return { headers };
  }

}
