import { Authenticated, AuthenticatedBuilder } from './AuthenticatedObject';

export class AuthSession {
  authenticated: Authenticated;

  constructor(authenticated: Authenticated) {
    this.authenticated = authenticated;
  }

  static fromOAuthResponse(response: any) {
    const expiresIn = response.expires_in;
    const expiresAt = new Date(new Date().getTime() + (expiresIn * 1000)).getTime();

    const authenticated = new AuthenticatedBuilder()
      .withTokenType('Bearer')
      .withAccessToken(response.access_token)
      .withRefreshToken(response.refresh_token)
      .withExpiresIn(expiresIn)
      .withExpiresAt(expiresAt)
      .build();

    return new AuthSession(authenticated);
  }

  static fromLocalStorage(): AuthSession {
    const storedSession = JSON.parse(localStorage.getItem('auth-session'));

    if (storedSession !== null && typeof storedSession !== 'undefined') {
      if (storedSession.authenticated !== null && typeof storedSession.authenticated !== 'undefined') {
        const authenticated = new AuthenticatedBuilder()
          .withTokenType(storedSession.authenticated.tokenType)
          .withAccessToken(storedSession.authenticated.accessToken)
          .withRefreshToken(storedSession.authenticated.refreshToken)
          .withExpiresIn(storedSession.authenticated.expiresIn)
          .withExpiresAt(storedSession.authenticated.expiresAt)
          .build();
        return new AuthSession(authenticated);
      }
    }

    return new AuthSession(Authenticated.empty());
  }

  getAuthenticated() {
    return this.authenticated;
  }

  isEmpty() {
    return this.getAuthenticated().isEmpty();
  }

  isExpired(): boolean {
    if (this.isEmpty()) {
      return true;
    } else {
      return Date.now() > this.getAuthenticated().expiresAt;
    }
  }

  store(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      resolve(localStorage.setItem('auth-session', JSON.stringify(this)));
    });
  }

  destroy(): void {
    localStorage.removeItem('auth-session');
  }

  toString() {
    return JSON.stringify(this);
  }

}
