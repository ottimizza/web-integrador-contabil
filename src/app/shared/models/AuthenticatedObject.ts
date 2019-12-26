export class Authenticated {
  username: string;

  tokenType: string;
  accessToken: string;
  refreshToken: string;

  expiresIn: number;
  expiresAt: number;

  constructor(
    username: string, tokenType: string, accessToken: string,
    refreshToken: string, expiresIn: number, expiresAt: number
  ) {
    this.username = username;
    this.tokenType = tokenType;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.expiresAt = expiresAt;
  }

  static empty() {
    return new Authenticated(
      null, null, null,
      null, null, null
    );
  }

  isEmpty(): boolean {
    return this.accessToken === null;
  }

}

export class AuthenticatedBuilder {

  username: string;

  tokenType: string;
  accessToken: string;
  refreshToken: string;

  expiresAt: number;
  expiresIn: number;

  static create(event: Authenticated) {
    return new Authenticated(
      event.username, event.tokenType, event.accessToken,
      event.refreshToken, event.expiresIn, event.expiresAt
    );
  }

  witUsername(username: string) {
    this.username = username;
    return this;
  }

  withTokenType(tokenType: string) {
    this.tokenType = tokenType;
    return this;
  }

  withAccessToken(accessToken: string) {
    this.accessToken = accessToken;
    return this;
  }

  withRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
    return this;
  }

  withExpiresIn(expiresIn: number) {
    this.expiresIn = expiresIn;
    return this;
  }

  withExpiresAt(expiresAt: number) {
    this.expiresAt = expiresAt;
    return this;
  }

  build() {
    return new Authenticated(
      this.username, this.tokenType, this.accessToken,
      this.refreshToken, this.expiresIn, this.expiresAt
    );
  }

}
