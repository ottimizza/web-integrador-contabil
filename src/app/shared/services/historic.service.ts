import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Empresa } from '@shared/models/Empresa';
import { Observable } from 'rxjs';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { FormattedHistoric, Historic } from '@shared/models/Historic';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { GenericResponse } from '@shared/models/GenericResponse';
import { map } from 'rxjs/operators';

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

  public fetch(searchCriteria: any) {
    const url = `${BASE_URL}/api/v1/historicos`;
    return this._http.get<GenericPageableResponse<FormattedHistoric>>([url, searchCriteria], 'Falha ao obter históricos!')
      .pipe(map(results => {
        results.records = results.records.map(rec => {
          if (rec.historico.match(/\$\{.*?\}/g).length === 3) {
            rec.historico = rec.historico + ' ${nenhum}  ${nenhum} ';
          }
          return rec;
        });
        return results;
      }));
  }

  public createHistoric(historic: FormattedHistoric): Observable<any> {
    const url = `${BASE_URL}/api/v1/historicos`;
    return this._http.post(url, historic, 'Falha ao criar histórico!');
  }

  public export(id: number, historico: FormattedHistoric) {
    const url = `${BASE_URL}/api/v1/salesforce/historico/${id}`;
    return this._http.patch(url, historico, 'Falha ao exportar histórico!');
  }

  public update(historic: FormattedHistoric) {
    const url = `${BASE_URL}/api/v1/historicos/${historic.id}`;
    return this._http.put(url, historic, 'Falha ao atualizar histórico!');
  }

  public delete(id: number) {
    const url = `${BASE_URL}/api/v1/historicos/${id}`;
    return this._http.delete(url, 'Falha ao excluir histórico!');
  }

  public getAll(searchCriteria: any) {
    const url = `${BASE_URL}/api/v1/historicos/sf`;
    return this._http.get<GenericResponse<FormattedHistoric>>([url, searchCriteria], 'Falha ao obter lista de históricos!');
  }

}
