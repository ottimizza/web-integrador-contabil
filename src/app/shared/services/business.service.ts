import { Injectable } from '@angular/core';
import { environment } from '@env';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { Empresa } from '@shared/models/Empresa';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { map } from 'rxjs/operators';
import { GenericResponse } from '@shared/models/GenericResponse';
import { ottUnpaginate } from '@shared/operators/paginate.operator';

const BASE_URL = `${environment.serviceUrl}/api/v1/empresas`;

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private _http: HttpHandlerService) { }

  public fetch(searchCriteria: any) {
    return this._http.get<GenericPageableResponse<Empresa>>([BASE_URL, searchCriteria], 'Falha ao obter empresas!');
  }

  public getById(id: number) {
    return this.fetch({ id })
    .pipe(ottUnpaginate());
  }

  public create(company: Empresa) {
    return this._http.post<GenericResponse<Empresa>>(BASE_URL, company, 'Falha ao criar empresa!');
  }

}
