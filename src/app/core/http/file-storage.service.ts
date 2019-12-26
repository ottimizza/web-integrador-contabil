
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { Observable } from 'rxjs';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { GenericResponse } from '@shared/models/GenericResponse';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  constructor(private http: HttpClient, private authorizationService: AuthenticationService) { }

  public store(file: any): Observable<GenericResponse<any>> {
    const applicationId = environment.storageApplicationId;
    const accountingId = environment.storageAccountingId;
    const formData = new FormData();
    formData.append('file', file);
    const url = `${environment.storageBaseUrl}/storage/${applicationId}/accounting/${accountingId}/store`;
    const headers = this.authorizationService.getNoBearerAuthorizationHeaders();
    return this.http.post<GenericResponse<any>>(url, formData, { headers });
  }

  getResourceURL(resourceId: string): string {
    return `${environment.storageBaseUrl}/storage/${resourceId}`;
  }

  // public fetch(resourceId: string): Observable<GenericResponse<any>> {
  //   const url = `${environment.storageBaseUrl}/storage/v1/organizations/${id}`;
  //   const headers = this.authorizationService.getAuthorizationHeaders();
  //   return this.http.get<GenericResponse<any>>(url, { headers });
  // }

  // public download(resourceId: string): Observable<GenericResponse<any>> {
  //   const url = `${environment.storageBaseUrl}/storage/v1/organizations`;
  //   const headers = this.authorizationService.getAuthorizationHeaders();
  //   return this.http.post<GenericResponse<any>>(url, organization, { headers });
  // }

}
