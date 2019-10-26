import { appConfig } from './../../../../../.history/src/app/shared/services/configuration.service_20191025001500';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError, from } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { TokenStorageService } from '../core/TokenStorageService.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class IdentityServerService {
    public get baseUrl(): string {
        return appConfig.identityBaseUrl + '/account';
    }
    constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private route: Router) {}

    login(loginModel: LoginModel): Observable<AccessToken> {
        console.log(this.baseUrl);
        return this.http
            .get<AccessToken>(`${this.baseUrl}/token`, {
                params: {
                    userName: loginModel.userName,
                    password: loginModel.passWord,
                    rememberMe: String(loginModel.rememberMe)
                }
            })
            .pipe(
                map((result: AccessToken) => {
                    console.log(result);
                    if (result instanceof Array) {
                        return result.pop();
                    }
                    return result;
                }),
                tap(this.saveAccessData.bind(this)),
                catchError(this.handleError('login', []))
            );
    }

    public isAuthorized(): Observable<boolean> {
        return of(!!this.tokenStorage.getAccessToken());
    }

    public getAccessToken(): Observable<string> {
        return of(this.tokenStorage.getAccessToken());
    }

    public getUserRoles(): Observable<any> {
        return of(this.tokenStorage.getUserRoles());
    }

    // public refreshToken(exceptedRole: string = null): Observable<AccessToken> {
    //     const loginModel: LoginModel = {
    //         grantType: 'token',
    //         rememberMe: this.tokenStorage.getAccessTokenIsExtended(),
    //         SelectedProfile: exceptedRole
    //     };
    //     // this.trackIdleService.track();

    //     return this.login(loginModel).pipe(
    //         catchError(error => {
    //             console.log('Failed to Authenticate.');
    //             this.tokenStorage.clear();
    //             return of(error);
    //             // return throwError(error);
    //         })
    //     );
    // }

    public refreshShouldHappen(response: HttpErrorResponse): boolean {
        return false;
        return response.status === 401;
    }

    public verifyTokenRequest(url: string): boolean {
        return url.indexOf(this.baseUrl) > -1;
    }

    // public login(loginModel: LoginModel): Observable<any> {
    //     return this.http
    //         .post<AccessData>(
    //             this.tokenUrl,
    //             loginModel
    //         )
    //         .pipe(
    //             map((result: any) => {
    //                 console.log(result);
    //                 if (result instanceof Array) {
    //                     return result.pop();
    //                 }
    //                 return result;
    //             }),
    //             tap(this.saveAccessData.bind(this)),
    //             catchError(this.handleError('login', []))
    //         );
    // }

    private handleError<T>(operation = 'operation', result?: any) {
        return (error: any): Observable<any> => {
            // TODO: send the error to remote logging infrastructure
            console.log('caught error', error); // log to console instead
            return throwError(error);
            return from(result);
        };
    }

    public logout(refresh?: boolean): void {
        this.tokenStorage.clear();
        // this.onCredentialUpdated$.next();
        if (refresh) {
            location.reload(true);
        } else {
            this.route.navigate(['/auth/login']);
        }
    }

    private saveAccessData(accessData: AccessToken) {
        this.tokenStorage.clear();
        if (!!accessData) {
            this.tokenStorage.setAccessToken(accessData.accessToken.token).setAccessTokenExpiration(accessData.accessToken.expiresIn);
            // .setAccessTokenIsExtended(accessData.isExtended);
            // this.onCredentialUpdated$.next();
            console.log('token created.');
        }
    }

    // public register(registrationModel: RegistrationModel, anonymousUserId?: string): Observable<any> {
    //     let url = this.userUrl;
    //     if (anonymousUserId) {
    //         url += `?anonymousUserId=${anonymousUserId}`;
    //     }
    //     return this.http.post(url, registrationModel).pipe(catchError(this.handleError('register', [])));
    // }

    // public preRegister(preRegistrationModel: any): Observable<any> {
    //     return this.http
    //         .post(`${this.userUrl}/pre-registration`, preRegistrationModel)
    //         .pipe(catchError(this.handleError('preRegister', [])));
    // }

    // public update(id: string, registrationModel: RegistrationModel): Observable<any> {
    //     return this.http.put(`${this.userUrl}/${id}`, registrationModel);
    // }

    // public changePassword(changePasswordModel: any): Observable<any> {
    //     return this.http.patch(this.userUrl, changePasswordModel);
    // }

    // public getUserInfoById(id: string): Observable<any> {
    //     return this.http.get(`${this.userUrl}/${id}`);
    // }
    // public sendEmailConfirmation(email: string, token: string): Observable<any> {
    //     const model = {
    //         token: token,
    //         email: email
    //     };
    //     return this.http.post(`${this.userUrl}/email-confirmation`, model);
    // }
    // public resendActivationMail(email: string): Observable<any> {
    //     return this.http
    //         .post(`${this.userUrl}/email-confirmation/${email}`, {})
    //         .pipe(catchError(this.handleError('resendActivationMail', [])));
    // }
    // public getPasswordRecovery(email: string): Observable<any> {
    //     return this.http.get(`${this.passwordRecovery}/${email}`).pipe(catchError(this.handleError('getPasswordRecovery', [])));
    // }

    // public requestPassword(credential: RegistrationModel): Observable<any> {
    //     return this.http
    //         .get(this.tokenUrl + '?' + this.util.urlParam(credential))
    //         .pipe(catchError(this.handleError('forgot-password', [])));
    // }

    // public hasAnyRoles(checkedRoles: any): boolean {
    //     if (!checkedRoles) {
    //         return true;
    //     }
    //     const userRoles = Object.keys(this.roleService.getRoles());
    //     if (typeof checkedRoles === 'string') {
    //         return userRoles.indexOf(checkedRoles) > -1;
    //     }
    //     if (checkedRoles instanceof Array) {
    //         for (const role of checkedRoles) {
    //             if (userRoles.indexOf(role) > -1) {
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // }
}
