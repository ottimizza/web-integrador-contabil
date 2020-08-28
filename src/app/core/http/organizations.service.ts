
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { GenericResponse } from '@shared/models/GenericResponse';
import { Organization } from '@shared/models/Organization';
import { environment } from '@env';
import { HttpHandlerService } from '@app/services/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpHandlerService) { }

  public fetch(searchCriteria: any): Observable<GenericPageableResponse<Organization>> {
    const url = `${environment.oauthBaseUrl}/api/v1/organizations`;
    return this.http.get<GenericPageableResponse<Organization>>([url, searchCriteria], 'Falha ao obter organizações!');
  }

  public fetchById(id: number): Observable<GenericResponse<Organization>> {
    const url = `${environment.oauthBaseUrl}/api/v1/organizations/${id}`;
    return this.http.get<GenericResponse<Organization>>(url, 'Falha ao obter informações da empresa selecionada!');
  }

  public create(organization: Organization): Observable<GenericResponse<Organization>> {
    const url = `${environment.oauthBaseUrl}/api/v1/organizations`;
    return this.http.post<GenericResponse<Organization>>(url, organization, 'Falha ao criar organização');
  }

  public patch(id: number, organization: Organization): Observable<GenericResponse<Organization>> {
    const url = `${environment.oauthBaseUrl}/api/v1/organizations/${id}`;
    return this.http.patch<GenericResponse<Organization>>(url, organization, 'Falha ao alterar organização!');
  }

}
