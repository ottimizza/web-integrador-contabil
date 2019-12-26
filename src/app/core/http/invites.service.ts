
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { Observable } from 'rxjs';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { GenericResponse } from '@shared/models/GenericResponse';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private http: HttpClient, private authorizationService: AuthenticationService) { }

  public invite(data = {}): Observable<GenericResponse<any>> {
    const url = `${environment.oauthBaseUrl}/api/v1/invites`;
    const headers = this.authorizationService.getAuthorizationHeaders();
    return this.http.post<GenericResponse<any>>(url, data, { headers });
  }

  public fetch(pageIndex: number = 0, pageSize: number = 10): Observable<GenericPageableResponse<any>> {
    const url = `${environment.oauthBaseUrl}/api/v1/invites?page_index=${pageIndex}&pageSize=${pageSize}`;
    const headers = this.authorizationService.getAuthorizationHeaders();
    return this.http.get<GenericPageableResponse<any>>(url, { headers });
  }

  public pendingCount(): Observable<GenericResponse<number>> {
    const url = `${environment.oauthBaseUrl}/api/v1/invites/pending_count`;
    const headers = this.authorizationService.getAuthorizationHeaders();
    return this.http.get<GenericResponse<number>>(url, { headers });
  }

}
