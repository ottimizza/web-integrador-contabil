import { Injectable } from '@angular/core';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { environment } from '@env';
import { GenericResponse } from '@shared/models/GenericResponse';
import { interval, Subject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { OrganizationService } from './organizations.service';
import { appIterateMap } from '@shared/operators/iterate-map.operator';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { Script } from '@shared/models/Script';
import { ottPaginate } from '@shared/operators/paginate.operator';

const BASE_URL = `${environment.serviceUrl}/api/v1/roteiros`;

@Injectable({ providedIn: 'root' })
export class WorkflowService {


  constructor(
    private http: HttpHandlerService,
  ) { }

  public fetch(searchCriteria: any) {
    return this.http.get([BASE_URL, searchCriteria], 'Falha ao buscar roteiros!')
    .pipe(ottPaginate());
  }

  public start(partialScript: Script) {
    return this.http.post<GenericResponse<Script>>(BASE_URL, partialScript, 'Falha ao iniciar roteiro!');
  }

  public complete(script: Script) {
    const url = `${BASE_URL}/${script.id}`;
    return this.http.patch<GenericResponse<Script>>(url, script, 'Falha ao criar roteiro!');
  }

  public upload(scriptId: number, file: File) {
    const url = `${BASE_URL}/${scriptId}`;
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(url, formData, 'Falha ao enviar arquivo!');
  }

}
