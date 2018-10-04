import { Injectable } from '@angular/core';
import Todo from './todo';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import consts from '../consts';
import User from './user';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userUrl =  `${consts.API}/user`;  // URL to web api
    user$ = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, 
        private jwtHelperService: JwtHelperService,
        private router: Router) {
        const userJson = localStorage.getItem("user");
        if (userJson) {
            const userObj = JSON.parse(localStorage.getItem("user"));
            this.user$.next(userObj);
        }
    }

    private saveToken(token: string) {
        localStorage.setItem("token", token);
    }

    private saveUser(user: User) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    private handleError(err: HttpErrorResponse) {
        return of(err.error);
    }

    getCurrentUser(): Observable<User> {
        return this.user$.asObservable();
    }

    addNewUserToSession(data: any) {
        this.saveToken(data.token);
        this.saveUser(data.user);
        this.user$.next(data.user);
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${this.userUrl}/login`, {
            email, password
        }).pipe(
            catchError(this.handleError),
            tap(data => {
                if (data.token) {
                    data.user.email = email;
                    this.addNewUserToSession(data);
                }
            }),
            switchMap(data => of(!!data.token))
        );
        ;
    }

    register(email: string, password: string) {
        return this.http.post<any>(`${this.userUrl}/register`, {
            email, password
        }).pipe(
            catchError(this.handleError),
            tap(data => {
                if (data.token) {
                    data.user.email = email;
                    this.addNewUserToSession(data);
                }
            }),
            switchMap(data => of(!!data.token))
        );
        ;
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.router.navigate(["/"]);
        this.user$.next(null);
    }
}
