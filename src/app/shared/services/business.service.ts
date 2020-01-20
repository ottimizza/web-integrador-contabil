import { Injectable } from '@angular/core';
import { environment } from '@env';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = environment.storageBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(
    private _auth: AuthenticationService,
    private _http: HttpClient
  ) { }

  getBusiness(business: string): Observable<any> {
    return this._http.get(`${BASE_URL}/api/v1/empresas?razaoSocial=${business}`, this._headers);
  }

  private get _headers() {
    const headers = this._auth.getAuthorizationHeaders();
    return { headers };
  }

}
