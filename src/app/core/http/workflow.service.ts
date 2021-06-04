import { switchMap, map, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { environment } from '@env';

import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { ottUnpaginate } from '@shared/operators/paginate.operator';
import { BusinessService } from '@shared/services/business.service';
import { GenericResponse } from '@shared/models/GenericResponse';
import { Script } from '@shared/models/Script';
import { User } from '@shared/models/User';
import { Layout } from '@shared/models/Layout';

const BASE_URL = `${environment.serviceUrl}/api/v1/roteiros`;

@Injectable({ providedIn: 'root' })
export class WorkflowService {

  constructor(
    private http: HttpHandlerService,
    private companyService: BusinessService
  ) { }

  public fetch(searchCriteria: any) {
    Object.assign(searchCriteria, { contabilidadeId: User.fromLocalStorage().organization.id });
    return this.http.get<GenericPageableResponse<Script>>([BASE_URL, searchCriteria], 'Falha ao buscar roteiros!');
  }

  public getById(id: number) {
    return this.fetch({ id })
    .pipe(ottUnpaginate());
  }

  // E então Deus disse, "haja RxJs", e houve RxJs
  public fetchWithCompany(searchCriteria: any) {
    return this.fetch(searchCriteria)
    .pipe(switchMap(resultSet => {
      return !resultSet.records.length ? of(resultSet) :
      combineLatest(resultSet.records.map(rec => this.companyService.getById(rec.empresaId)))
      .pipe(map(rs => {
        resultSet.records = resultSet.records.map((rec, index) => {
          const company = rs[index].record;
          return Object.assign(rec, company ? {
            nomeEmpresa: company.razaoSocial,
            erpEmpresa: company.codigoERP,
            nomeCompleto: `${company.codigoERP} - ${company.razaoSocial || ''}`.toUpperCase().replace('NULL - ', '')
          } : {});
        });
        return resultSet;
      }));
    }));
  }

  public start(partialScript: Script) {
    return this.http.post<GenericResponse<Script>>(BASE_URL, partialScript, 'Falha ao iniciar roteiro!');
  }

  public patch(id: number, script: any) {
    const url = `${BASE_URL}/${id}`;
    return this.http.patch<GenericResponse<Script>>(url, script, 'Falha ao alterar roteiro!');
  }

  public upload(scriptId: number, file: File, cnpjEmpresa: string, cnpjContabilidade: string, storageBucket: string) {
    const url = `${BASE_URL}/${scriptId}`;
    const searchCriteria = { cnpjEmpresa, cnpjContabilidade, applicationId: storageBucket };
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<GenericResponse<Script>>([url, searchCriteria], formData, 'Falha ao enviar arquivo!', 'Enviando arquivo...');
  }

  public delete(id: number) {
    const url = `${BASE_URL}/${id}`;
    return this.http.delete(url, 'Falha ao excluir projeto!');
  }

  public setLayouts(roteiro: Script, layouts: Layout[]) {
    const url = `${BASE_URL}/layouts`;
    return this.http.post(url, { roteiro, layouts }, 'Falha ao criar integrações!');
  }

}
