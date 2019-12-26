import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { environment } from '@env';

@Injectable({ providedIn: 'root' })
export class LancamentoService {
    constructor(private http: HttpClient, private authService: AuthenticationService) { }

    public getEntry(): Observable<any> {
        const url = `${environment.storageBaseUrl}/v1/lancamentos`;
        const headers = this.authService.getAuthorizationHeaders();

        return this.http.get(url, {headers});
    }
}
