import { Injectable } from '@angular/core';
const accessTokenKey = 'accessToken';
const expirationKey = 'accessTokenExpiration';
const isExtendedKey = 'accessTokenIsExtended';

@Injectable()
export class TokenStorageService {
    public get token(): string {
        return <string>localStorage.getItem(accessTokenKey);
    }

    public get parsedToken(): string {
        return !!this.token && this.parseJwt(this.token);
    }

    public getAccessToken(): string {
        return this.token;
    }

    public getAccessTokenExpiration(): Date {
        const expirationString = localStorage.getItem(expirationKey);
        const expirationDate = expirationString ? new Date(expirationString) : null;
        return expirationDate;
    }
    public getAccessTokenIsExtended(): boolean {
        const isExtendedString = localStorage.getItem(isExtendedKey);
        const isExtendedKeyBool = isExtendedString === 'true';
        return isExtendedKeyBool;
    }

    public setAccessToken(token: string): TokenStorageService {
        localStorage.setItem(accessTokenKey, token);
        return this;
    }

    public setAccessTokenExpiration(expiration: any) {
        localStorage.setItem(expirationKey, expiration);
        return this;
    }
    public setAccessTokenIsExtended(isExtended: any) {
        localStorage.setItem(isExtendedKey, isExtended);
        return this;
    }

    public clear() {
        localStorage.removeItem(accessTokenKey);
        localStorage.removeItem(expirationKey);
        localStorage.removeItem(isExtendedKey);
    }

    public getUserEmail(): string {
        const emailClaim = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';
        return this.getTokenClaim(emailClaim);
    }

    public getUserId(): string {
        const idClaim = 'user_id';
        return this.getTokenClaim(idClaim);
    }

    public getUserFullName(): string {
        const firstNameClaim = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname';
        const lastNameClaim = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname';
        const firstName = this.getTokenClaim(firstNameClaim);
        const lastName = this.getTokenClaim(lastNameClaim);
        return `${firstName} ${lastName}`;
    }

    public getUserPicture(): string {
        // TODO: currently not supported, need to be supported in the future.
        return null;
    }

    public getUserRoles(): string[] {
        const roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
        let currentRoles = this.getTokenClaim(roleClaim);
        if (currentRoles) {
            if (currentRoles instanceof Array) {
                currentRoles = currentRoles;
            } else {
                currentRoles = [currentRoles];
            }
            return currentRoles;
        }
        return [];
    }

    public parseJwt(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    }

    private getTokenClaim(claimName: string): any {
        const decodedToken = this.parsedToken;
        return !!decodedToken && decodedToken[claimName];
    }
}
