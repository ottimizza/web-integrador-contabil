import { Injectable } from '@angular/core';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { environment } from '@env';
import { GenericResponse } from '@shared/models/GenericResponse';
import { interval, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OrganizationService } from './organizations.service';
import { appIterateMap } from '@shared/operators/iterate-map.operator';

const BASE_URL = `${environment.serviceUrl}/api/v1/workflow`;

@Injectable({ providedIn: 'root' })
export class WorkflowService {

  private intervals: any = {};

  constructor(
    private http: HttpHandlerService,
    private organizationService: OrganizationService
  ) { }

  public fetch(searchCriteria: any) {
    return this.http.get([BASE_URL, searchCriteria], 'Falha ao buscar roteiros!')
    .pipe(appIterateMap(script => this.organizationService.fetchById(script.empresaId), 'record'));
  }

  public delete(id: number) {
    const url = `${BASE_URL}/${id}`;
    return this.http.delete(url, 'Falha ao excluir roteiro!');
  }

  public register(mappingId: number) {
    if (this.intervals[mappingId]) {
      this.intervals[mappingId].unsubscribe();
    }
    const fiveMinutes = 300000; // ms
    return this._register(mappingId, fiveMinutes);
  }

  private _register(mappingId: number, period: number) {
    const sub$ = new Subject<boolean>();
    this.intervals[mappingId] = interval(period)
    .pipe(switchMap(() => this._verifyState(mappingId)))
    .subscribe(rs => {

      if (rs.record === true) {
        this.intervals[mappingId].unsubscribe();
        this.intervals[mappingId] = undefined;
        sub$.next(true);
      }

    });
    return sub$;
  }

  private _verifyState(mappingId: number) {
    const url = `${BASE_URL}/planilha/status/${mappingId}`;
    return this.http.get<GenericResponse<boolean>>(url, 'Falha ao validar status do processamento de planilha!');
  }

}
