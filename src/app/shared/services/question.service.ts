import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { GenericResponse } from '@shared/models/GenericResponse';
import { Lancamento } from '@shared/models/Lancamento';

const BASE_URL = `${environment.serviceUrl}/questionar/v1`;

@Injectable({ providedIn: 'root' })
export class QuestionService {

  constructor(
    private httpClient: HttpClient
  ) {}

  public getLancamentoByUuid(uuid: string) {
    const url = `${BASE_URL}/lancamentos/${uuid}`;
    return this.httpClient.get<GenericResponse<Lancamento>>(url, this.headers);
  }

  public setNewComplement(uuid: string, text: string) {
    const url = `${BASE_URL}/lancamentos/${uuid}`;
    return this.httpClient.patch<GenericResponse<null>>(url, { complemento01: text }, this.headers);
  }

  private get headers() {
    const headers = { 'Content-Type': 'application/json' };
    return { headers };
  }

}
