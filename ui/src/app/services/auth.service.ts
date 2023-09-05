import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';

import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLoggedIn$ = new BehaviorSubject<Boolean>(false);
  //@ts-ignore
  userId: Pick<User, "id">;

  private url = "http://localhost:3000/auth/";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  }

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService, private router: Router) { }

  signup(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.url}/signup`, user, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<User>("signup"))
    )
  }

  login(email: Pick<User, "email">, password: Pick<User, "password">): Observable<{
    token: string;
    userId: Pick<User, "id">
  }> {
    return this.http
    .post(`${this.url}/login`, { email, password }, this.httpOptions)
    .pipe(
      first(),
      tap((tokenObject: any) => {
          this.userId = tokenObject.userId;
          localStorage.setItem('token', tokenObject.token);
          this.isUserLoggedIn$.next(true);
          this.router.navigate(["pages"])
        }),
      catchError(this.errorHandlerService.handleError<{
        token: string;
        userId: Pick<User, "id">
      }>("login"))
    )
  }
}
