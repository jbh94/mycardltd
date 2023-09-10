import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { PageService } from "src/app/services/page.service";
import { AuthService } from "src/app/services/auth.service";

import { Page } from "src/app/models/Page";
import { User } from "src/app/models/User";

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.scss"],
})
export class PagesComponent implements OnInit {
  pages$!: Observable<Page[]>;
  userId?: Pick <User, 'id'> | string;

  constructor(
    private pageService: PageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.pages$ = this.fetchAll();
    this.userId = this.authService.userId;
  }

  fetchAll(): Observable<Page[]> {
    return this.pageService.fetchAll();
  }

  createPage(): void {
    this.pages$ = this.fetchAll();
  }

  delete(pageId: any): void {
    console.log(pageId, 'pageId');
    this.pageService
      .deletePage(pageId)
      .subscribe(() => (this.pages$ = this.fetchAll()));
  }

  test() {
    console.log('test')
  }
}