import { Injectable } from '@angular/core';
import { environment } from '@env';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { FormattedHistoric } from '@shared/models/Historic';

const BASE_URL = `${environment.serviceUrl}/api/v1/salesforce`;

@Injectable({ providedIn: 'root' })
export class SalesforceService {

  constructor(private http: HttpHandlerService) {}

  public exportRule(ruleId: number) {
    const url = `${BASE_URL}/patch/${ruleId}`;
    return this.http.patch(url, {}, 'Falha ao exportar regra!');
  }

  public exportHistoric(historicId: number, historic: FormattedHistoric) {
    const url = `${BASE_URL}/historico/${historicId}`;
    return this.http.patch(url, historic, 'Falha ao exportar histórico!');
  }

}
