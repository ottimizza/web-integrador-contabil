import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { Empresa } from '@shared/models/Empresa';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { Deprecated } from '@shared/decorators/deprecated.decorator';

const BASE_URL = `${environment.serviceUrl}/api/v1/empresas`;

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private _http: HttpHandlerService) { }

  public fetch(searchCriteria: any) {
    return this._http.get<GenericPageableResponse<Empresa>>([BASE_URL, searchCriteria], 'Falha ao obter empresas!');
  }

  @Deprecated('Prefer to use fetch directly')
  getBusiness(business: string): Observable<GenericPageableResponse<Empresa>> {
    return this.fetch({ razaoSocial: business, tipo: 2 });
  }

  @Deprecated('Prefer to use fetch directly')
  getByErpCode(erp: string): Observable<GenericPageableResponse<Empresa>> {
    return this.fetch({ codigoErp: erp, tipo: 2 });
  }


}
