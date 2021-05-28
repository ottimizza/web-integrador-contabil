import { Injectable } from '@angular/core';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { environment } from '@env';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { GenericResponse } from '@shared/models/GenericResponse';
import { KeyMap } from '@shared/models/KeyMap';
import { Layout } from '@shared/models/Layout';

const BASE_URL = `${environment.serviceUrl}/api/v1/layout_padrao`;

@Injectable({ providedIn: 'root' })
export class StandardLayoutService {

  constructor(
    private http: HttpHandlerService
  ) {}

  public fetch(filter: any) {
    return this.http.get<GenericPageableResponse<Layout>>([BASE_URL, filter], 'Falha ao obter layouts padrões!');
  }

  public create(layout: Layout) {
    return this.http.post(BASE_URL, layout, 'Falha ao criar layout padrão!');
  }

  public update(id: number, layout: KeyMap<Layout>) {
    const url = `${BASE_URL}/${id}`;
    return this.http.patch(url, layout, 'Falha ao atualizar layout!');
  }

  public delete(id: number) {
    const url = `${BASE_URL}/${id}`;
    return this.http.delete(url, 'Falha ao atualizar layout!');
  }

  public layoutToScript(scriptId: number, layoutId: number) {
    const url = `${environment.serviceUrl}/api/v1/roteiro_layout`;
    return this.http.post(url, { roteiroId: scriptId, layoutId }, 'Falha ao criar integração!');
  }

}
