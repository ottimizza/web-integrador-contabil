import { Injectable } from '@angular/core';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { environment } from '@env';
import { GenericResponse } from '@shared/models/GenericResponse';
import { combineLatest, Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Script } from '@shared/models/Script';
import { ottPaginate, ottUnpaginate } from '@shared/operators/paginate.operator';
import { SearchCriteria } from '@shared/models/SearchCriteria';
import { BusinessService } from '@shared/services/business.service';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { User } from '@shared/models/User';
import { Checklist, ChecklistInputType } from '@shared/models/Checklist';

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
  public fetchWithCompany(searchCriteria: SearchCriteria) {
    return this.fetch(searchCriteria)
    .pipe(switchMap(resultSet => {
      if (!resultSet.records.length) {
        return of(resultSet);
      }
      return combineLatest(resultSet.records.map(rec => this.companyService.getById(rec.empresaId)))
      .pipe(map(rs => {
        resultSet.records = resultSet.records.map((rec, index) => {
          const company = rs[index].record;
          return Object.assign(rec, { nomeEmpresa: company.razaoSocial, erpEmpresa: company.codigoERP });
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
    return this.http.post<GenericResponse<Script>>([url, searchCriteria], formData, 'Falha ao enviar arquivo!');
  }

  public delete(id: number) {
    const url = `${BASE_URL}/${id}`;
    return this.http.delete(url, 'Falha ao excluir projeto!');
  }

}
