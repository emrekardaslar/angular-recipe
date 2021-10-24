import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) { }
    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=YOURKEY',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(errorRes => {
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    return throwError('This email exists already');
                case 'EMAIL_NOT_FOUND':
                    return throwError('This email does not exist');
                case 'INVALID_PASSWORD':
                    return throwError('This password is not correct');
                default:
                    return throwError('Something went wrong');
            }
        }));
    }
}