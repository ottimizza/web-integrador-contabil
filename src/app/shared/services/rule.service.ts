import { Injectable } from '@angular/core';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { RuleCreateFormat } from '@shared/models/Rule';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/authentication/authentication.service';

const BASE_URL = environment.storageBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class RuleService {

  constructor(private _http: HttpClient, private _auth: AuthenticationService) { }

  createRule(rule: RuleCreateFormat): Observable<any> {
    return this._http.post(`${BASE_URL}/api/v1/regras`, rule, this._headers);
  }

  private get _headers() {
    const headers = this._auth.getAuthorizationHeaders();
    return { headers };
  }

}
