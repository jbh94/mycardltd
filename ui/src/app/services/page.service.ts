import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';
import { Page } from '../models/Page';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private url = "http://localhost:3000/page";

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  }

  fetchAll(): Observable<Page[]> {
    return this.http.get<Page[]>(this.url, {
      responseType: 'json'
    }).pipe(
      catchError(this.errorHandlerService.handleError<Page[]>("fetchAll()", []))
    )
  }

  createPage(formData: Partial<Page>, userId: Pick<User, "id">): Observable<Page> {
    return this.http.post<Page>(this.url, {
      title: formData.title,
      body: formData.body,
      user: userId
    }, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<Page>("createPage()"))
    )
  }

  deletePage(pageId: any): Observable<{}> {
    console.log(pageId, 'pageid from delete service')
    return this.http.delete<Page>(`${this.url}/${pageId}`, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Page>("deletePost()"))
    )
  }

}
